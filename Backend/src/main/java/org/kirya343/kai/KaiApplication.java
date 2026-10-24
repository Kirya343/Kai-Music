package org.kirya343.kai;

import java.util.function.Consumer;

import org.kirya343.kai.infrastructure.diagnostics.SpringDiagnosticCommandProvider;
import io.github.kirya343.terminal.components.DiagnosticCommandProvider;
import io.github.kirya343.terminal.runtime.TerminalManaged;
import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ConfigurationPropertiesScan
@TerminalManaged
public class KaiApplication {
    
    public static void main(String[] args, Consumer<DiagnosticCommandProvider> registerProvider) {
        SpringApplication app = new SpringApplication(KaiApplication.class);
        app.setBannerMode(Banner.Mode.OFF);
        
        ConfigurableApplicationContext context = app.run(args);

        SpringDiagnosticCommandProvider provider =
            context.getBean(SpringDiagnosticCommandProvider.class);

        registerProvider.accept(provider);
    }
}
