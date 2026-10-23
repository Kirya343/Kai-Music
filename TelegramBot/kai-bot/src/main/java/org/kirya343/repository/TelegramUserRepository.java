package org.kirya343.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.kirya343.entity.TelegramUser;

public interface TelegramUserRepository extends JpaRepository<TelegramUser, Long> {

    Optional<TelegramUser> findByTelegramId(Long telegramId);
}
