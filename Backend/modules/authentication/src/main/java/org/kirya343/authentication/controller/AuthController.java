package org.kirya343.authentication.controller;

import java.io.IOException;

import org.kirya343.security.core.annotations.controllers.Authenticated;
import org.kirya343.security.core.annotations.controllers.PublicEndpoint;
import org.kirya343.authentication.service.AuthCookiesService;
import org.kirya343.authentication.service.AuthService;
import org.kirya343.authentication.dto.AuthResponse;
import org.kirya343.authentication.dto.LoginRequest;
import org.kirya343.authentication.dto.RegisterRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthCookiesService cookiesService;
    private final AuthService authService;

    @PostMapping("/login")
    @PublicEndpoint 
    public AuthResponse login(
        @Valid @RequestBody LoginRequest request, 
        HttpServletResponse response
    ) throws IOException, ServletException {
        return authService.login(request, response);
    }

    @PostMapping("/register")
    @PublicEndpoint 
    public AuthResponse register(
        @Valid @RequestBody RegisterRequest regRequest,
        HttpServletRequest request,
        HttpServletResponse response
    ) {
        return authService.registerLocal(regRequest, request, response);
    }

    @PostMapping("/refresh")
    @PublicEndpoint 
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) {
        authService.refreshToken(request, response);
    }

    @PostMapping("/logout")
    @Authenticated
    public void logout(HttpServletResponse response) {
        cookiesService.deleteAuthCookies(response);
    }
}
