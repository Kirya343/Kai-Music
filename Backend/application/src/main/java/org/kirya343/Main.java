package org.kirya343;

import java.nio.file.Path;

import io.github.kirya343.terminal.runtime.TerminalConfig;
import io.github.kirya343.terminal.runtime.TerminalRuntime;

public class Main {

	public static void main(String[] args) {

		TerminalConfig config = TerminalConfig.defaultConfig();

		config.logFile(Path.of("logs/application.log"));

		TerminalRuntime.launch(
			KaiApplication.class, 
			"kai music", 
			args,
			new SpringAdapter(),
			config
		);
	}
}