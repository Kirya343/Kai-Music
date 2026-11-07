
import { ReactNode } from "react";
import { DataProvider } from "@common";
import { RoomPlaybackProvider } from "@playback";

export const AppProviders = ({ children }: {children: ReactNode}) => {
    return (
        <DataProvider>
            <RoomPlaybackProvider>
                {children}
            </RoomPlaybackProvider>
        </DataProvider>
    );
};