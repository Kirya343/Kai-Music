import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@user";
import { api } from "@common";
import { loggerFactory } from "@common";

const logger = loggerFactory.getLogger("Pages.Logout");

const LogoutPage = () => {

    const navigate = useNavigate();

    const { clearUser } = useAuth();

    const logout = useCallback(async () => {
        try {
            await api.post("/auth/logout");
        } catch (e) {
            logger.error("Logout failed", e);
        } finally {
            navigate("/");
            clearUser();
        }
    }, [navigate, clearUser]);

    useEffect(() => {
        logout()
    }, [logout])
    
    return (
        <></>
    );
};

export default LogoutPage;