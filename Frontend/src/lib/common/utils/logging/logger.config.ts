
import type { LoggerConfig } from "./logger";
import { LoggerFactory } from "./logger";

const config: LoggerConfig = {
    defaultLevel: "INFO",

    categories: {
        /* Audio: {
            Buffer: "DEBUG",
            MediaSource: "DEBUG",
            Playback: "DEBUG",
        }, */
        WebSocket: "ERROR",
        GlobalContext: "DEBUG",

        HTTP: "NONE",

        Pages: {
            Room: "INFO",
            Main: "INFO",
        },

        Data: {
            Room: "DEBUG"
        }
    },

    isGroupCollapsed: false
};

export const loggerFactory = new LoggerFactory(config);