import { createContext, useContext } from "react";
import { userService, IShortUser, IUser } from "@user";

interface AuthContextType {
    isAuthenticated: boolean;
    user: IUser | null;
    shortUser: IShortUser | null;
    loading: boolean;
    isAdmin: boolean;
    loadUser: () => void;
    clearUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
}

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {

    const { 
        user, 
        isAuthenticated, 
        loading, 
        shortUser, 
        isAdmin, 
        loadUser,
        clearUser
    } = userService.useCurrentUser();

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, shortUser, loading, isAdmin, loadUser, clearUser }}>
            {children}
        </AuthContext.Provider>
    );
};