package org.kirya343;

import org.kirya343.terminal.runtime.TerminalManaged;
import org.kirya343.terminal.runtime.TerminalRuntime;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ConfigurationPropertiesScan
@TerminalManaged
public class ApiApplication {

	public static void main(String[] args) {
		TerminalRuntime.launch(ApiApplication.class, args);
		SpringApplication.run(ApiApplication.class, args);
	}

}
