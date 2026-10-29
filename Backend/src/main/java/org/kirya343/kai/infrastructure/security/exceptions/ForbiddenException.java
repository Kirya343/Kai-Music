package org.kirya343.kai.infrastructure.security.exceptions;

public class ForbiddenException extends RuntimeException {

    public ForbiddenException() {
        super("Authentication required");
    }
}

