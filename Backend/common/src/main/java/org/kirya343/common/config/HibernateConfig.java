package org.kirya343.common.config;

import org.kirya343.common.logging.QueryCounter;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HibernateConfig {

    @Bean
    public HibernatePropertiesCustomizer queryCounterCustomizer(
        QueryCounter queryCounter
    ) {
        return properties -> properties.put(
            "hibernate.session_factory.statement_inspector",
            queryCounter
        );
    }
}