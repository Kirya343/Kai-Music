package org.kirya343.common.logging;

import org.hibernate.resource.jdbc.spi.StatementInspector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class QueryCounter implements StatementInspector {

    private static final Logger logger = LoggerFactory.getLogger(QueryCounter.class);

    private final ThreadLocal<Integer> count = ThreadLocal.withInitial(() -> 0);

    @Override
    public String inspect(String sql) {
        int currentCount = count.get() + 1;
        count.set(currentCount);

        String formattedSql = sql.length() > 100
            ? sql.substring(0, 100) + "..."
            : sql;
            
        logger.debug(
            "Query #{} -> {}", 
            currentCount, 
            formattedSql);

        return sql;
    }

    public int getCount() {
        return count.get();
    }

    public void reset() {
        count.set(0);
    }

    public void clear() {
        count.remove();
    }
}