package org.kirya343.authentication.service;

import java.util.Arrays;

import org.kirya343.security.jwt.JwtService;
import org.kirya343.user.services.UserCommandService;
import org.kirya343.user.datasource.User;
import org.kirya343.user.datasource.UserRepository;
import org.kirya343.authentication.dto.AuthResponse;
import org.kirya343.authentication.dto.LoginRequest;
import org.kirya343.authentication.dto.RegisterRequest;
import org.kirya343.security.core.enums.AuthProvider;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j 
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserCommandService userCommandService;
    private final AuthCookiesService cookiesService;
    
    public AuthResponse login(LoginRequest request, HttpServletResponse response) {

        long start = System.nanoTime();

        User user = userRepository.findByEmail(request.email()).orElse(null);

        long afterQuery = System.nanoTime();

        if (user == null) {
            return new AuthResponse(false, "Account does not exist");
        }

        if (!user.getProviders().contains(AuthProvider.LOCAL)) {
            return new AuthResponse(false, "This account does not support local logging in");
        }

        if (!userCommandService.authenticate(user, request.password())) {
            return new AuthResponse(false, "Incorrect password");
        }

        long afterAuth = System.nanoTime();

        cookiesService.setAuthCookies(response, user);

        long afterCookies = System.nanoTime();

        log.debug(
            "Login timing: query={}ms, auth={}ms, cookies={}ms",
            (afterQuery - start) / 1_000_000,
            (afterAuth - afterQuery) / 1_000_000,
            (afterCookies - afterAuth) / 1_000_000
        );

        return new AuthResponse(true, "You successfuly signed in");
    }

    public AuthResponse registerLocal(
        RegisterRequest regRequest, 
        HttpServletRequest request,
        HttpServletResponse response
    ) {

        if (userRepository.existsByEmail(regRequest.email())) {
            log.debug("Пользователь с таким именем уже зарегистрирован");
            return new AuthResponse(false, "This email is already registered");
        }

        User user = userCommandService.registerLocal(
            regRequest.email(), 
            regRequest.name(), 
            regRequest.password(), 
            request
        );

        cookiesService.setAuthCookies(response, user);

        return new AuthResponse(true, "You successfully signed up");
    }

    public void refreshToken(HttpServletRequest request, HttpServletResponse response) {

        log.debug("Обновляем токен пользователя");

        String refreshToken = getTokenFromCookies(request, "refreshToken");
        log.debug("Токен найден? {}", refreshToken != null ? (refreshToken.substring(0, 50) + "...") : null);

        if (refreshToken == null) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nothing to refresh");

        Boolean isTokenOld = jwtService.isTokenOld(refreshToken);

        if (isTokenOld) {
            cookiesService.deleteAuthCookies(response);

            log.debug("Token of user is old! Deleting...");

            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "UserId is undefined");
        }

        Long userId = jwtService.validateAndGetUserId(refreshToken);

        log.debug("userId: {}", userId);

        if (userId == null) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "UserId is undefined");

        User user = userRepository.findById(userId).orElse(null);

        log.debug("Пользователь найден");

        if (user == null) throw new ResponseStatusException(HttpStatus.NO_CONTENT, "User does not exist");

        cookiesService.setAuthCookies(response, user);
    }

    private String getTokenFromCookies(HttpServletRequest request, String cookieName) {
        if (request.getCookies() == null) return null;

        return Arrays.stream(request.getCookies())
                .filter(c -> cookieName.equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }
}
