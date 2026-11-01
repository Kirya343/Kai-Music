package org.kirya343.diagnostics;

import java.util.List;

import io.github.kirya343.terminal.components.DiagnosticCommandProvider;
import io.github.kirya343.terminal.components.DiagnosticComponent;
import io.github.kirya343.terminal.components.commands.DiagnosticCommand;
import org.springframework.stereotype.Component;

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