
import type { LoggerConfig } from "./logger";
import { LoggerFactory } from "./logger";

const config: LoggerConfig = {
    defaultLevel: "INFO",

    categories: {
        Audio: {
            Buffer: "INFO",
            MediaSource: "INFO",
            Playback: "INFO",
        },
        WebSocket: "ERROR",
        GlobalContext: "INFO",

        HTTP: "NONE",

        Pages: {
            Room: "INFO",
            Main: "INFO",
        },

        Data: {
            Room: "INFO"
        }
    },

    isGroupCollapsed: false
};

export const loggerFactory = new LoggerFactory(config);