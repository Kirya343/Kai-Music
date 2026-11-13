
import { ReactNode } from "react";
import { DataProvider } from "@common";
import { PlaybackProvider } from "@playback";

export const AppProviders = ({ children }: {children: ReactNode}) => {
    return (
        <DataProvider>
            <PlaybackProvider>
                {children}
            </PlaybackProvider>
        </DataProvider>
    );
};