package org.kirya343.bot;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.kirya343.entity.TelegramUser;
import org.kirya343.repository.TelegramUserRepository;
import org.kirya343.service.UploadService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.GetFile;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Audio;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Voice;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.meta.api.objects.File;

import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class AudioBot extends TelegramLongPollingBot {

    private final TelegramUserRepository repository;
    private final UploadService uploadService;

    // лучше потом вынести в properties
    @Value("${telegram.bot.token}")
    private String botToken;

    @Value("${telegram.bot.username}")
    private String botUsername;

    @Override
    public String getBotUsername() {
        return botUsername;
    }

    @Override
    public String getBotToken() {
        return botToken;
    }

    @Override
    public void onUpdateReceived(Update update) {

        if (!update.hasMessage()) {
            return;
        }

        Message message = update.getMessage();
        Long telegramId = message.getFrom().getId();

        if (message.hasText()) {
            handleText(message, telegramId);
            return;
        }

        if (message.hasAudio()) {
            handleAudio(message, telegramId);
            return;
        }

        if (message.hasVoice()) {
            handleVoice(message, telegramId);
        }
    }

    private void handleText(Message message, Long telegramId) {

        String text = message.getText();

        if ("/start".equals(text)) {
            send(message.getChatId(), "Send your authorization code");
            return;
        }

        TelegramUser user = repository.findByTelegramId(telegramId)
                .orElseGet(TelegramUser::new);

        user.setTelegramId(telegramId);
        user.setUsername(message.getFrom().getUserName());
        user.setCode(text);

        repository.save(user);

        send(message.getChatId(), "Code saved");
    }

    private void handleAudio(Message message, Long telegramId) {
        Audio audio = message.getAudio();
        processFile(telegramId, audio.getFileId(), message.getChatId());
    }

    private void handleVoice(Message message, Long telegramId) {
        Voice voice = message.getVoice();
        processFile(telegramId, voice.getFileId(), message.getChatId());
    }

    private void processFile(Long telegramId, String fileId, Long chatId) {

        Optional<TelegramUser> optionalUser = repository.findByTelegramId(telegramId);

        if (optionalUser.isEmpty()) {
            send(chatId, "Send code first");
            return;
        }

        TelegramUser user = optionalUser.get();

        try {
            File tgFile = execute(new GetFile(fileId));

            java.io.File downloaded = downloadFile(tgFile.getFilePath());

            uploadService.upload(downloaded, user.getCode());

            send(chatId, "Uploaded");

        } catch (TelegramApiException e) {
            log.error("Telegram API error", e);
            send(chatId, "Error");
        } catch (Exception e) {
            log.error("Upload error", e);
            send(chatId, "Error");
        }
    }

    private void send(Long chatId, String text) {

        try {
            SendMessage msg = SendMessage.builder()
                    .chatId(chatId)
                    .text(text)
                    .build();

            execute(msg);

        } catch (TelegramApiException e) {
            log.error("Telegram send error", e);
        }
    }
}