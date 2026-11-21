import { IKebabAction } from "@/components/ui/KebabMenu/KebabMenu";
import KebabMenu from "@/components/ui/KebabMenu/KebabMenu";
import styles from "./TrackActions.module.scss";
import { ITrackAction } from "../../types";

interface TrackActionsProps {
    actions: ITrackAction[];
    extraActions?: IKebabAction[];
}

export const TrackActions = ({
    actions,
    extraActions
}: TrackActionsProps) => {
    return (
        <div className={styles.actions}>
            {actions.map(action => (
                <button
                    key={action.title}
                    title={action.title}
                    onClick={event => {
                        event.stopPropagation();
                        action.func();
                    }}
                >
                    {action.icon}
                </button>
            ))}

            {extraActions && (
                <KebabMenu actions={extraActions} />
            )}
        </div>
    );
};