package org.kirya343.authentication.dto;

public record AuthResponse(
    Boolean success,
    String message
) {
}
