package org.kirya343.diagnostics;

import java.util.Collection;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import io.github.kirya343.terminal.api.annotations.CommandGroup;
import io.github.kirya343.terminal.command.registration.CommandInstanceProvider;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SpringCommandInstanceProvider
        implements CommandInstanceProvider {

    private final ApplicationContext applicationContext;

    @Override
    public Collection<Object> getInstances() {
        return List.copyOf(
            applicationContext
                .getBeansWithAnnotation(CommandGroup.class)
                .values()
        );
    }

    @Override
    public <T> T getInstance(Class<T> commandClass) {
        return applicationContext.getBean(commandClass);
    }
}