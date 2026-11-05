package org.kirya343.security.jwt;

import java.util.Collection;

import org.kirya343.security.services.PermissionsService;
import org.kirya343.security.core.dto.UserAuthData;
import org.kirya343.security.core.enums.UserStatus;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CachedPermissionsJwtTokenConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final PermissionsService permissionsService;

    @Override
    public AbstractAuthenticationToken convert(@NonNull Jwt jwt) {

        Long userId = jwt.getClaim("userId");

        Collection<GrantedAuthority> authorities =
            permissionsService.getUserPermissions(userId);

        UserAuthData authData = new UserAuthData(
            jwt.getClaim("userId"),
            jwt.getSubject(),
            jwt.getClaim("name"),
            UserStatus.valueOf(jwt.getClaim("status"))
        );

        return new UserJwtAuthenticationToken(jwt, authorities, authData);
    }
}
