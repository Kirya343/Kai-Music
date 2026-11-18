import { useMemo, useRef } from "react"
import styles from "./AvatarStack.module.scss"
import { getRandomColor } from "@common";

interface User {
    name: string
}

interface ColoredUser extends User {
    color?: string;
}

export default function AvatarStack({ users }: { users: User[]}) {

    const colors = useRef<Map<string, string>>(new Map());

    const colored = useMemo<ColoredUser[]>(() => {
        return users.map(user => {
            if (!colors.current.has(user.name)) {
                colors.current.set(user.name, getRandomColor());
            }

            return {
                ...user,
                color: colors.current.get(user.name)!
            };
        });
    }, [users]);

    return (
        <div className={styles.avatarStack}>
            {colored?.slice(0, 5).map((listener, idx) => (
                <span 
                    key={idx} 
                    style={{ backgroundColor: listener.color }} 
                    title={listener.name}
                >
                    {listener.name.charAt(0)}
                </span>
            ))}

            {users.length > 5 && (
                <span
                    className={styles.counter}
                    style={{ backgroundColor: "#212121" }} 
                    title={`${users.length} listeners`}
                >
                    +{users.length - 5}
                </span>
            )}
        </div>
    )
}