
import type { LoggerConfig } from "./logger";
import { LoggerFactory } from "./logger";

const config: LoggerConfig = {
    defaultLevel: "INFO",

    categories: {
        Audio: "DEBUG",
        "Audio.Buffer": "DEBUG",
        "Audio.MediaSource": "DEBUG",
        "Audio.Playback": "DEBUG",
        WebSocket: "ERROR",
        GlobalContext: "DEBUG",

        "HTTP.Request": "NONE",
        "HTTP.Response": "NONE",
        "HTTP.Error": "NONE",
    },

    isGroupCollapsed: false
};

export const loggerFactory = new LoggerFactory(config);