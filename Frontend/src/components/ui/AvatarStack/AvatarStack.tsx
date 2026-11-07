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
            {colored?.map((listener, idx) => (
                <span 
                    key={idx} 
                    style={{ backgroundColor: listener.color }} 
                    title={listener.name}
                >
                    {listener.name.charAt(0)}
                </span>
            ))}
        </div>
    )
}