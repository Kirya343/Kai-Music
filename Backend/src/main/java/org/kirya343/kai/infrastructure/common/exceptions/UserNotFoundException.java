package org.kirya343.kai.infrastructure.common.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String userParam) {
        super("Пользователь не найден по параметру: \"" + userParam + "\"");
    }
}
