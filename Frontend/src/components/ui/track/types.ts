import { ReactNode } from "react";

export interface ITrackAction {
    title: string;
    func: () => void;
    icon: ReactNode;
}

export interface TrackVisualParameters {
    id?: boolean;
    title?: boolean;
    artist?: boolean;
    album?: boolean;
    duration?: boolean;
}