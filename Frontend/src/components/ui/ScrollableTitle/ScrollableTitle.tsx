import { HTMLAttributes, useEffect, useRef } from "react";
import styles from "./ScrollableTitle.module.scss"

interface ScrollableTitleProps extends HTMLAttributes<HTMLDivElement> {
    title: string 
}

const ScrollableTitle = ({ title, ...divProps }: ScrollableTitleProps) => {

    const headerRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const header = headerRef.current;
        const text = textRef.current;

        if (!header || !text) return;

        if (text.scrollWidth > header.clientWidth) {
            text.classList.add(styles.animate);
        } else {
            text.classList.remove(styles.animate);
        }
    }, [title]);

    return (
        <div ref={headerRef} className={styles.header} {...divProps}>
            <div ref={textRef} className={styles.headerText}>
                {title}
            </div>
        </div>
    )
}

export default ScrollableTitle;