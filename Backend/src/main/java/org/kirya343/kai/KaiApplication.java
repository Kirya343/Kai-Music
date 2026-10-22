package org.kirya343.kai;

import org.kirya343.terminal.runtime.TerminalManaged;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ConfigurationPropertiesScan
@TerminalManaged
public class KaiApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(KaiApplication.class, args);
    }
}
