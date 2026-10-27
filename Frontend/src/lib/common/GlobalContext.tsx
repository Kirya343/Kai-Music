import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

/**
 * Defines the global application context.
 */
interface GlobalContextType {
    /** Indicates whether the application has started. */
    started: boolean;

    /** Updates the application started state. */
    setStarted: Dispatch<SetStateAction<boolean>>;

    /** Indicates whether the viewport is considered mobile. */
    isMobile: boolean;
}

/**
 * React context for global application state.
 */
const GlobalContext = createContext<GlobalContextType | null>(null);

/**
 * Provides access to the global application context.
 *
 * @throws {Error} If used outside of GlobalProvider.
 * @returns The global application context value.
 */
export const useGlobal = () => {
    const ctx = useContext(GlobalContext);
    if (!ctx) {
        throw new Error("useGlobal must be used inside GlobalProvider");
    }
    return ctx;
}

/**
 * Provides global state to its descendant components.
 *
 * @param children - Child components that can access the global context.
 * @returns The global context provider.
 */
export const GlobalProvider = ({ children }: { children?: React.ReactNode }) => {

    const [started, setStarted] = useState<boolean>(false);
    console.log("перемонтировали statred", started)

    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        const handleClick = () => {
            setStarted(true);
            console.log("МЫ ПОЛУЧИЛИ КЛИК")
            document.body.removeEventListener("click", handleClick);
        };

        document.body.addEventListener("click", handleClick);

        return () => {
            document.body.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <GlobalContext.Provider value={{
            started,
            setStarted,
            isMobile
        }}>
            {children}
        </GlobalContext.Provider>
    );
};