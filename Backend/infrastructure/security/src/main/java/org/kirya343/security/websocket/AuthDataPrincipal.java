package org.kirya343.security.websocket;

import java.security.Principal;

import org.kirya343.security.core.dto.UserAuthData;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthDataPrincipal implements Principal {

    private final UserAuthData authData;

    @Override
    public String getName() {
        // имя пользователя для Spring /user/queue/…
        return authData.sub();  
    }

    public UserAuthData getAuthData() {
        return authData;
    }
}
