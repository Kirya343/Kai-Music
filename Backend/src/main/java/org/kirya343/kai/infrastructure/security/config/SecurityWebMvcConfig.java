package org.kirya343.kai.infrastructure.security.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.kirya343.kai.infrastructure.security.services.AuthUserArgumentResolver;
import org.kirya343.kai.infrastructure.security.services.AuthenticationInterceptor;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class SecurityWebMvcConfig implements WebMvcConfigurer {

    private final AuthenticationInterceptor authenticationInterceptor;
    private final AuthUserArgumentResolver authUserArgumentResolver;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authenticationInterceptor).addPathPatterns("/**");
        
        log.debug("AuthenticationInterceptor added to inceptors");
    }

    @Override
    public void addArgumentResolvers(
            List<HandlerMethodArgumentResolver> resolvers
    ) {
        resolvers.add(authUserArgumentResolver);
    }

    @PostConstruct
    public void init() {
        log.debug(
                "AuthenticationInterceptor bean: {}",
                authenticationInterceptor
        );
    }
}
