import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./ScrollArea.module.scss";

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
    /** Показывать полосу только при наведении или во время скролла */
    showOnHover?: boolean;
}

const MIN_THUMB_HEIGHT = 28;

export const ScrollArea: React.FC<ScrollAreaProps> = ({
    children,
    className,
    contentClassName,
    showOnHover = true,
    ...rest
}) => {
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const scrollTimerRef = useRef<number | null>(null);

    const dragStateRef = useRef<{
        isDragging: boolean;
        startY: number;
        startScrollTop: number;
    }>({
        isDragging: false,
        startY: 0,
        startScrollTop: 0,
    });

    const [hasOverflow, setHasOverflow] = useState(false);
    const [thumbHeight, setThumbHeight] = useState(0);
    const [thumbTop, setThumbTop] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const syncMetrics = useCallback(() => {
        const el = viewportRef.current;
        const track = trackRef.current;
        if (!el) return;

        const { scrollHeight, clientHeight, scrollTop } = el;
        const overflow = scrollHeight - clientHeight > 1;
        setHasOverflow(overflow);

        if (!overflow || clientHeight <= 0) {
            setThumbHeight(0);
            setThumbTop(0);
            return;
        }

        const trackHeight = track?.clientHeight || clientHeight;
        const calculatedThumbHeight = Math.max(
            MIN_THUMB_HEIGHT,
            Math.round((clientHeight / scrollHeight) * trackHeight)
        );
        const clampedThumbHeight = Math.min(calculatedThumbHeight, trackHeight);

        const maxThumbTop = Math.max(0, trackHeight - clampedThumbHeight);
        const maxScrollTop = Math.max(1, scrollHeight - clientHeight);
        const calculatedThumbTop = Math.round((scrollTop / maxScrollTop) * maxThumbTop);

        setThumbHeight(clampedThumbHeight);
        setThumbTop(Math.min(maxThumbTop, Math.max(0, calculatedThumbTop)));
    }, []);

    useEffect(() => {
        const el = viewportRef.current;
        if (!el) return;

        syncMetrics();

        const resizeObserver = new ResizeObserver(() => {
            syncMetrics();
        });

        resizeObserver.observe(el);
        if (el.firstElementChild) {
            resizeObserver.observe(el.firstElementChild);
        }

        return () => {
            resizeObserver.disconnect();
            if (scrollTimerRef.current !== null) {
                window.clearTimeout(scrollTimerRef.current);
            }
        };
    }, [syncMetrics, children]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const drag = dragStateRef.current;
            const el = viewportRef.current;
            const track = trackRef.current;
            if (!drag.isDragging || !el) return;

            const trackHeight = track?.clientHeight || el.clientHeight;
            const maxThumbTop = Math.max(1, trackHeight - thumbHeight);
            const maxScrollTop = Math.max(0, el.scrollHeight - el.clientHeight);

            const deltaY = e.clientY - drag.startY;
            const scrollDelta = (deltaY / maxThumbTop) * maxScrollTop;

            el.scrollTop = drag.startScrollTop + scrollDelta;
        };

        const handleMouseUp = () => {
            if (!dragStateRef.current.isDragging) return;
            dragStateRef.current.isDragging = false;
            setIsDragging(false);
            document.body.style.userSelect = "";
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            document.body.style.userSelect = "";
        };
    }, [thumbHeight]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        syncMetrics();

        setIsScrolling(true);
        if (scrollTimerRef.current !== null) {
            window.clearTimeout(scrollTimerRef.current);
        }
        scrollTimerRef.current = window.setTimeout(() => {
            setIsScrolling(false);
        }, 700);

        rest.onScroll?.(e);
    };

    const handleThumbMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const el = viewportRef.current;
        if (!el) return;

        dragStateRef.current = {
            isDragging: true,
            startY: e.clientY,
            startScrollTop: el.scrollTop,
        };
        setIsDragging(true);
        document.body.style.userSelect = "none";
    };

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== trackRef.current) return;

        const el = viewportRef.current;
        const track = trackRef.current;
        if (!el || !track) return;

        const rect = track.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const trackHeight = rect.height;
        const ratio = Math.min(1, Math.max(0, clickY / trackHeight));
        const maxScrollTop = Math.max(0, el.scrollHeight - el.clientHeight);

        el.scrollTop = ratio * maxScrollTop - el.clientHeight * 0.35;
    };

    return (
        <div
            className={clsx(
                styles.root,
                hasOverflow && styles.hasOverflow,
                showOnHover && styles.hoverOnly,
                (isScrolling || isDragging) && styles.isActive,
                isDragging && styles.isDragging,
                className
            )}
        >
            <div
                ref={viewportRef}
                onScroll={handleScroll}
                className={styles.viewport}
                {...rest}
            >
                <div className={clsx(styles.inner, contentClassName)}>{children}</div>
            </div>

            {hasOverflow && (
                <div
                    ref={trackRef}
                    className={styles.track}
                    onClick={handleTrackClick}
                    aria-hidden="true"
                >
                    <div
                        className={styles.thumb}
                        onMouseDown={handleThumbMouseDown}
                        style={{
                            height: `${thumbHeight}px`,
                            transform: `translateY(${thumbTop}px)`,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ScrollArea;