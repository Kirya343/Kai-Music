package org.kirya343.kai.infrastructure.security.exceptions;

public class UnauthenticatedException extends RuntimeException {

    public UnauthenticatedException() {
        super("Authentication required");
    }
}
