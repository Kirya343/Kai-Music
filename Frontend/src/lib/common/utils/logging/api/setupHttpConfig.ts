import type { AxiosInstance } from "axios";
import { loggerFactory } from "../logger.config";

const requestLogger = loggerFactory.getLogger("HTTP.Request");
const responseLogger = loggerFactory.getLogger("HTTP.Response");
const errorLogger = loggerFactory.getLogger("HTTP.Error");

export const setupHttpLogging = (instance: AxiosInstance) => {
    instance.interceptors.request.use(config => {
        config.metadata = {
            startTime: performance.now(),
        };

        requestLogger.debug({
            method: config.method?.toUpperCase(),
            url: config.baseURL
                ? `${config.baseURL}${config.url ?? ""}`
                : config.url,
            params: config.params,
            data: config.data,
        });

        return config;
    });

    instance.interceptors.response.use(
        response => {
            responseLogger.debug({
                method: response.config.method?.toUpperCase(),
                url: response.config.url,
                status: response.status,
                duration: performance.now() -
                    (response.config.metadata?.startTime ?? 0),
                data: response.data,
            });

            return response;
        },
        error => {
            errorLogger.error({
                method: error.config?.method?.toUpperCase(),
                url: error.config?.url,
                status: error.response?.status,
                duration: error.config?.metadata?.startTime
                    ? performance.now() - error.config.metadata.startTime
                    : undefined,
                message: error.message,
                response: error.response?.data,
            });

            return Promise.reject(error);
        }
    );
};