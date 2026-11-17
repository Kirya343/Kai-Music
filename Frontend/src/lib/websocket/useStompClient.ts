"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Client, Frame } from "@stomp/stompjs";

import { API_BASE } from "@/config";
import { useAuth } from "@user";
import { api, loggerFactory } from "@common";

const logger = loggerFactory.getLogger("WebSocket");

interface UseStompClientResult {
    client: Client | null;
    connected: boolean;
    error: boolean;
    addOnConnectHandler(handler: (client: Client, isReconnect: boolean) => void): () => void;
}

export function useStompClient(): UseStompClientResult {
    const { user, clearUser } = useAuth();

    const clientRef = useRef<Client | null>(null);
    const hasConnectedRef = useRef(false);

    const [client, setClient] = useState<Client | null>(null);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState(false);

    type Cleanup = () => void;
    type OnConnectHandler = (client: Client, isReconnect: boolean) => void | Cleanup;

    const handlers = useRef(new Set<OnConnectHandler>());
    const cleanups = useRef(new Map<OnConnectHandler, Cleanup>());

    const userSub = user?.sub

    const cleanupClient = useCallback(() => {
        if (!clientRef.current) return;

        try {
            clientRef.current.deactivate();
        } catch (e) {
            logger.warn("⚠️ Error during cleanup:", e);
        }

        clientRef.current = null;
        setClient(null);
        setConnected(false);
    }, []);

    const connect = useCallback(async () => {
        if (!userSub) return;
        if (!API_BASE) return;
        if (clientRef.current?.active) return;

        const stompClient = new Client({
            webSocketFactory: () =>
                new WebSocket(
                    `${API_BASE.replace(/^http/, "ws")}/ws`
                ),

            reconnectDelay: 1000,

            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,
        });

        stompClient.onConnect = () => {
            const isReconnect = hasConnectedRef.current;

            hasConnectedRef.current = true;
            clientRef.current = stompClient;

            setClient(stompClient);
            setConnected(true);
            setError(false);

            logger.debug("Подключение")

            logger.debug("Восстановление подписок: ", handlers.current.size)

            for (const handler of handlers.current) {
                cleanups.current.get(handler)?.();

                const cleanup = handler(stompClient, isReconnect);

                if (cleanup) {
                    cleanups.current.set(handler, cleanup);
                } else {
                    cleanups.current.delete(handler);
                }
            }
        };

        stompClient.onDisconnect = () => {
            logger.info("Disconnected")
            setConnected(false);
        };

        stompClient.onStompError = async (frame: Frame) => {
            const message =
                frame?.headers?.message || "Unknown STOMP error";

            logger.error("❌ Broker error:", message);

            const isAuthError =
                message.includes("invalidToken") ||
                message.includes("Missing access token");

            if (!isAuthError) {
                setError(true);
                return;
            }

            try {
                logger.info("Trying to refresh token")

                await api.post("/auth/refresh", null, {});

                await stompClient.deactivate();

                clientRef.current = null;

                await connect();
            } catch (error) {
                logger.error("Failed to refresh token:", error);
                clearUser();
                setError(true);
            }
        };

        stompClient.onWebSocketClose = () => {
            logger.info("Closed")
            setConnected(false);
        };

        stompClient.activate();
    }, [userSub, cleanupClient]);

    const addOnConnectHandler = useCallback(
        (handler: OnConnectHandler): Cleanup => {
            handlers.current.add(handler);

            logger.debug("Handler registered:", handlers.current.size);

            if (clientRef.current?.connected) {
                const cleanup = handler(
                    clientRef.current,
                    hasConnectedRef.current
                );

                if (cleanup) {
                    cleanups.current.set(handler, cleanup);
                }
            }

            return () => {
                cleanups.current.get(handler)?.();
                cleanups.current.delete(handler);
                handlers.current.delete(handler);

                logger.debug("Handler removed:", handlers.current.size);
            };
        },
        []
    );

    const instanceId = useId();

    useEffect(() => {

        logger.debug("STOMP effect start:", instanceId);

        logger.debug("Пользователь: ", userSub)
        if (!userSub) return;

        connect();

        return () => {
            cleanupClient();

            logger.debug("STOMP effect cleanup:", instanceId);
        };
    }, [userSub, connect, cleanupClient]);

    return {
        client,
        connected,
        error,
        addOnConnectHandler
    };
}