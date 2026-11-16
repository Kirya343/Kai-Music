package org.kirya343.playback.unit.infrasctucture.streaming.user;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.kirya343.playback.infrastructure.streaming.playback.worker.PlaybackStreamWorker;
import org.kirya343.playback.infrastructure.streaming.user.AudioStreamService;
import org.kirya343.playback.infrastructure.streaming.user.worker.UserStreamWorker;
import org.kirya343.playback.presentation.websocket.PlaybackWebsocketService;
import org.kirya343.user.dto.ShortUserDTO;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import io.github.kirya343.terminal.logging.DiagnosticLogging;
import io.github.kirya343.terminal.logging.DiagnosticLoggingConfigurer;
import io.github.kirya343.terminal.logging.LogBuffer;
import io.github.kirya343.terminal.logging.LogCollector;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserStreamWorkerTest {

    @Mock
    private PlaybackWebsocketService websocketService;

    @Mock
    private AudioStreamService audioStreamService;

    @Mock
    private PlaybackStreamWorker playbackWorker;

    @InjectMocks
    private UserStreamWorker worker;

    @BeforeAll
    static void setupLogging() {
        LogBuffer logBuffer = new LogBuffer(1000);
        LogCollector logCollector = new LogCollector(logBuffer);

        DiagnosticLoggingConfigurer loggingConfigurer =
            new DiagnosticLoggingConfigurer(logCollector);

        loggingConfigurer.configure();
        DiagnosticLogging.initialize(loggingConfigurer);
    }

    // Проверяем, что пользователь успешно подписывается на PlaybackStreamWorker.
    @Test
    void shouldSubscribeToWorker() {

        // Создаём тестового пользователя с идентификатором, именем и аватаром.
        ShortUserDTO user = new ShortUserDTO("btbtewbbud2q388238", "Kirya", "");

        // Вызываем тестируемый метод — подписываем пользователя на worker.
        worker.subscribe(playbackWorker, user);

        // Проверяем, что worker сохранился как текущая подписка пользователя.
        // Первый аргумент — ожидаемое значение, второй — фактическое.
        assertEquals(playbackWorker, worker.getSubscribedWorker());

        // Проверяем, что playbackWorker получил вызов subscribe()
        // именно с этими аргументами.
        verify(playbackWorker).subscribe(worker, user);
    }

    // Проверяем, что повторная подписка на тот же worker игнорируется.
    @Test
    void shouldNotSubscribeTwiceToSameWorker() {

        // Создаём тестового пользователя.
        ShortUserDTO user = new ShortUserDTO("btbtewbbud2q388238", "Kirya", "");

        // Выполняем первую подписку.
        worker.subscribe(playbackWorker, user);

        // Пытаемся повторно подписаться на тот же worker.
        // Повторный вызов должен быть проигнорирован.
        worker.subscribe(playbackWorker, user);

        // Проверяем, что метод subscribe() у playbackWorker
        // был вызван ровно один раз, а не два.
        verify(playbackWorker, times(1)).subscribe(worker, user);
    }
}