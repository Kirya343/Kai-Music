
export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    NONE = 4,
}

const LEVELS: Record<string, LogLevel> = {
    DEBUG: LogLevel.DEBUG,
    INFO: LogLevel.INFO,
    WARN: LogLevel.WARN,
    ERROR: LogLevel.ERROR,
    NONE: LogLevel.NONE,
};

export type LoggerCategoryConfig =
    | keyof typeof LEVELS
    | {
        [key: string]: LoggerCategoryConfig;
    };

export interface LoggerConfig {
    defaultLevel: keyof typeof LEVELS;
    categories: Record<string, LoggerCategoryConfig>;
    isGroupCollapsed?: boolean;
}

class NamedLogger {
    constructor(
        private readonly name: string,
        private readonly config: LoggerConfig
    ) {}

    private getLevel(): LogLevel {
        const parts = this.name.split(".");

        while (parts.length > 0) {
            const category = parts.join(".");
            const configured = this.config.categories[category];

            if (typeof configured === "string") {
                return LEVELS[configured];
            }

            parts.pop();
        }

        return LEVELS[this.config.defaultLevel];
    }

    private log(level: LogLevel, label: string, color: string, args: unknown[]) {
        if (level < this.getLevel()) return;

        if (this.config.isGroupCollapsed) {
            console.groupCollapsed(
                `%c[${this.name}] %c[${label}]`,
                "color: #9b59b6; font-weight: bold",
                `color: ${color}; font-weight: bold`
            );

            console.log(...args);
            console.groupEnd();
        } else {
            console.log(
                `%c[${this.name}] %c[${label}]`,
                "color: #9b59b6; font-weight: bold",
                `color: ${color}; font-weight: bold`,
                ...args
            );
        }

    }

    debug(...args: unknown[]) {
        this.log(LogLevel.DEBUG, "DEBUG", "#999", args);
    }

    info(...args: unknown[]) {
        this.log(LogLevel.INFO, "INFO", "#3498db", args);
    }

    warn(...args: unknown[]) {
        this.log(LogLevel.WARN, "WARN", "#f39c12", args);
    }

    error(...args: unknown[]) {
        this.log(LogLevel.ERROR, "ERROR", "#e74c3c", args);
    }
}

export class LoggerFactory {
    private readonly categories: Record<string, keyof typeof LEVELS> = {};

    constructor(private readonly config: LoggerConfig) {
        this.flattenCategories(config.categories);
    }

    private flattenCategories(
        categories: Record<string, LoggerCategoryConfig>,
        prefix = ""
    ) {
        for (const [name, value] of Object.entries(categories)) {
            const category = prefix
                ? `${prefix}.${name}`
                : name;

            if (typeof value === "string") {
                this.categories[category] = value;
            } else {
                this.flattenCategories(value, category);
            }
        }
    }

    getLogger(name: string): NamedLogger {
        return new NamedLogger(name, {
            ...this.config,
            categories: this.categories,
        });
    }
}