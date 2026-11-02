package org.kirya343;

import io.github.kirya343.terminal.runtime.TerminalManaged;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ConfigurationPropertiesScan
@TerminalManaged
public class KaiApplication {
}
