package org.kirya343.infrastructure.diagnostics.core;

import java.util.List;

import org.kirya343.infrastructure.diagnostics.commands.DiagnosticCommand;

public interface DiagnosticComponent {

    String getComponentId();

    List<DiagnosticCommand> getCommands();
}