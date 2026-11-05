package org.kirya343.security.jwt;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import org.kirya343.security.core.dto.UserAuthData;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtIssuer {
    
    private final RSAKey rsaKey;

    public String issueAccessToken(UserAuthData auth) throws JOSEException {

        Instant now = Instant.now();
        JWSSigner signer = new RSASSASigner(rsaKey);

        // Строим JWT
        JWTClaimsSet set = new JWTClaimsSet.Builder()
                .subject(auth.id().toString())
                .issueTime(Date.from(now))
                .expirationTime(Date.from(now.plus(Duration.ofDays(1))))
                .claim("sub", auth.sub())
                .claim("name", auth.name())
                .claim("status", auth.status())
                .jwtID(UUID.randomUUID().toString())
                .build();

        JWSHeader header = new JWSHeader.Builder(JWSAlgorithm.RS256)
                .keyID(rsaKey.getKeyID())
                .type(JOSEObjectType.JWT)
                .build();

        SignedJWT jwt = new SignedJWT(header, set);
        jwt.sign(signer);
        return jwt.serialize();
    }

    public String issueRefreshToken(UserAuthData auth) throws JOSEException {

        Instant now = Instant.now();
        JWSSigner signer = new RSASSASigner(rsaKey);

        JWTClaimsSet set = new JWTClaimsSet.Builder()
                .subject(auth.id().toString())
                .issueTime(Date.from(now))
                .expirationTime(Date.from(now.plus(Duration.ofDays(30))))
                .claim("uid", auth.id())
                .claim("sub", auth.sub())
                .claim("type", "refresh")
                .jwtID(UUID.randomUUID().toString())
                .build();

        JWSHeader header = new JWSHeader.Builder(JWSAlgorithm.RS256)
                .keyID(rsaKey.getKeyID())
                .type(JOSEObjectType.JWT)
                .build();

        SignedJWT jwt = new SignedJWT(header, set);
        jwt.sign(signer);

        return jwt.serialize();
    }
}
