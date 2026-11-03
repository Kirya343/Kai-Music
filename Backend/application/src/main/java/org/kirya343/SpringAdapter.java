package org.kirya343;

import java.util.function.Consumer;

import org.kirya343.diagnostics.SpringDiagnosticCommandProvider;
import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.event.ContextClosedEvent;

import io.github.kirya343.terminal.api.provider.DiagnosticCommandProvider;
import io.github.kirya343.terminal.runtime.ApplicationAdapter;
import io.github.kirya343.terminal.runtime.ApplicationLifecycle;

public class SpringAdapter implements ApplicationAdapter {

    @Override
    public void launch(
        Class<?> applicationClass,
        String[] args,
        Consumer<DiagnosticCommandProvider> registerProvider,
        ApplicationLifecycle lifecycle
    ) {
        SpringApplication app = new SpringApplication(applicationClass);

        app.setBannerMode(Banner.Mode.OFF);

        app.addListeners(
            (ApplicationListener<ApplicationReadyEvent>) event ->
                lifecycle.onStarted()
        );

        app.addListeners(
            (ApplicationListener<ContextClosedEvent>) event ->
                lifecycle.onStopped()
        );

        try {
            ConfigurableApplicationContext context = app.run(args);

            SpringDiagnosticCommandProvider provider =
                context.getBean(SpringDiagnosticCommandProvider.class);

            registerProvider.accept(provider);

        } catch (Throwable e) {
            lifecycle.onFailed(e);
            throw e;
        }
    }
}
