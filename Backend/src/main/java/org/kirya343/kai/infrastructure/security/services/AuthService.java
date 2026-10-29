package org.kirya343.kai.infrastructure.security.services;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Map;

import org.kirya343.kai.infrastructure.common.exceptions.UserNotFoundException;
import org.kirya343.kai.infrastructure.security.jwt.JwtService;
import org.kirya343.kai.features.user.services.UserCommandService;
import org.kirya343.kai.features.user.datasource.User;
import org.kirya343.kai.features.user.datasource.UserRepository;
import org.kirya343.kai.features.authentication.dto.LoginRequest;
import org.kirya343.kai.features.authentication.dto.RegisterRequest;
import org.kirya343.kai.features.user.enums.AuthProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.ServletException;
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
    
    public ResponseEntity<?> login(LoginRequest request, HttpServletResponse response) {

        User user = userRepository.findByEmail(request.email()).orElse(null);

        if (user == null) {
            return ResponseEntity.ok(Map.of("success", false, "message", "Account does not exist"));
        }

        if (!user.getProviders().contains(AuthProvider.LOCAL)) {
            return ResponseEntity.ok(Map.of("success", false, "message", "This account does not support local logging in"));
        }

        if (!userCommandService.authenticate(user, request.password())) {
            return ResponseEntity.ok(Map.of("success", false, "message", "Incorrect password"));
        }

        try {
            cookiesService.setAuthCookies(response, user);
        } catch (ServletException e) {
            log.error("Ошибка создания куков пользователя {}: {}", user.getId(), e);
        }

        return ResponseEntity.ok(Map.of("success", true, "message", "You successfuly signed in"));
    }

    public ResponseEntity<?> registerLocal(
        RegisterRequest regRequest, 
        HttpServletRequest request,
        HttpServletResponse response
    ) {

        if (userRepository.existsByName(regRequest.name())) {
            log.debug("Пользователь с таким именем уже зарегистрирован");
            return ResponseEntity.ok(
                Map.of("success", false, 
                       "message", "This name is already registered"
                ));
        }

        User user = userCommandService.registerLocal(regRequest, request);

        try {
            cookiesService.setAuthCookies(response, user);
        } catch (ServletException e) {
            log.error("Ошибка создания куков пользователя {}: {}", user.getId(), e);
        }

        return ResponseEntity.ok(Map.of("success", true, "message", "You successfully signed up"));
    }

    public void refreshToken( HttpServletRequest request, HttpServletResponse response) {
        log.debug("Обновляем токен пользователя");
        try {

            Long userId = jwtService.validateAndGetUserId(getTokenFromCookies(request, "refreshToken"));

            log.debug("userId: {}", userId);

            User user = null;
            if (userId != null) {
                user = userRepository.findById(userId).orElse(null);
                log.debug("Пользователь найден по id: {}", user != null);

                if (user == null) {
                    log.debug("Пользователь не найден, создаём временного");
                    throw new UserNotFoundException(userId.toString());
                }
            } else {
                throw new IllegalStateException("RefreshToken не содержит ID пользователя. Авторизуйтесь повторно");
            }

            userRepository.save(user);

            cookiesService.setAuthCookies(response, user); // 4. обновляем куки с токенами

        } catch (Exception e) {
            log.error("Ошибка сервера при обновлении токена: {}", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Ошибка сервера при обновлении токена.");
        }
    }

    public void redirectToGoogle(
        String redirect,
        HttpServletRequest request,
        HttpServletResponse response
    ) throws IOException {
        log.debug("redirect: " + redirect);

        Long userId = jwtService.validateAndGetUserId(getTokenFromCookies(request, "refreshToken"));
        String redirectUrl = URLEncoder.encode(redirect, StandardCharsets.UTF_8);

        request.getSession().setAttribute("tempUserId", userId);
        request.getSession().setAttribute("redirectUrl", redirectUrl);

        response.sendRedirect("/oauth2/authorization/google");
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
