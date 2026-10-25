import { IShortUser, IUser } from "@user";
import { useCallback, useEffect, useMemo, useState } from "react";
import { userService } from "..";


export function useCurrentUser() {
    const [user, setUser] = useState<IUser | null>(() => {
        const saved = localStorage.getItem("user");

        return saved ? JSON.parse(saved) : null;
    });

    const [loading, setLoading] = useState(true);

    const isAuthenticated = useMemo<boolean>(() => {
        if (!user) return false;
        return user?.email?.length > 0;
    }, [user]);

    const isAdmin = useMemo<boolean>(() => user?.roles?.some(r => r.name === "ADMIN") ?? false, [user]);

    const shortUser = useMemo<IShortUser | null>(() => {
        if (!isAuthenticated || !user) return null;
        return { openId: user.openId, name: user.name, avatarUrl: user.avatarUrl ?? "" }
    }, [isAuthenticated, user])

    const loadUser = useCallback(async (cancelled?: boolean) => {
        try {
            const res = await userService.getCurrent();

            if (!cancelled) {
                setUser(res.data);
            }
        } finally {
            setLoading(false);
        }
    }, [])

    const clearUser = useCallback(() => {
        setUser(null)
    }, [setUser])

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        let cancelled = false;

        loadUser(cancelled);

        return () => {
            cancelled = true;
        };
    }, []);

    return { 
        user, 
        isAuthenticated, 
        isAdmin, 
        shortUser, 
        loading, 
        loadUser, 
        clearUser 
    };
}