package org.kirya343;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TelegramAudioBotApplication {

    public static void main(String[] args) {

        SpringApplication.run(
                TelegramAudioBotApplication.class,
                args
        );
    }
}