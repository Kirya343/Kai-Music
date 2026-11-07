import { ReactNode } from "react";
import { GlobalProvider } from "@common";
import { AuthProvider } from "@user";

export const GlobalProviders = ({ children }: {children: ReactNode}) => {
    return (
        <GlobalProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </GlobalProvider>
    );
};