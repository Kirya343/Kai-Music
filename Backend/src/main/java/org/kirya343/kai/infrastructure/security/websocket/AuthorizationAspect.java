package org.kirya343.kai.infrastructure.security.websocket;

import java.lang.reflect.Method;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.kirya343.kai.infrastructure.security.services.AuthorizationService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Aspect
@Component
@RequiredArgsConstructor
public class AuthorizationAspect {

    private final AuthorizationService authorizationService;

    @Around(
        "@annotation(org.kirya343.kai.infrastructure.security.annotations.controllers.PublicEndpoint) || " +
        "@annotation(org.kirya343.kai.infrastructure.security.annotations.controllers.Authenticated) || " +
        "@annotation(org.kirya343.kai.infrastructure.security.annotations.controllers.RequiredPermission) || " +
        "@annotation(org.kirya343.kai.infrastructure.security.annotations.controllers.RequiredRole)"
    )
    public Object authorize(
        ProceedingJoinPoint joinPoint
    ) throws Throwable {

        MethodSignature signature =
            (MethodSignature) joinPoint.getSignature();

        Method method = signature.getMethod();

        Authentication authentication =
            SecurityContextHolder
                .getContext()
                .getAuthentication();

        authorizationService.authorize(
            method,
            authentication
        );

        return joinPoint.proceed();
    }
}
