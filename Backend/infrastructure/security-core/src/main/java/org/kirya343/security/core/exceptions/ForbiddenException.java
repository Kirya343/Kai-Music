package org.kirya343.security.core.exceptions;

public class ForbiddenException extends RuntimeException {

    public ForbiddenException() {
        super("Authentication required");
    }
}

