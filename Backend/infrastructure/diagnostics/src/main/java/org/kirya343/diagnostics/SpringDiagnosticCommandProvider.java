package org.kirya343.diagnostics;

import java.util.List;


import org.springframework.stereotype.Component;

import io.github.kirya343.terminal.api.command.DiagnosticCommand;
import io.github.kirya343.terminal.api.component.DiagnosticComponent;
import io.github.kirya343.terminal.api.provider.DiagnosticCommandProvider;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
@Getter 
public class SpringDiagnosticCommandProvider 
    implements DiagnosticCommandProvider {

    private final List<DiagnosticCommand> commands;
    private final List<DiagnosticComponent> components;
}