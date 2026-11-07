import { Dispatch, HTMLAttributes, ReactNode, SetStateAction, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom";
import styles from "./SelectableList.module.scss"
import clsx from "clsx";
import KebabMenu from "../KebabMenu/KebabMenu";

interface SelectableListProps<T extends ItemKey> extends HTMLAttributes<HTMLDivElement> {
    data: Record<T, ReactNode>;
    extraActions: ListAction<T>[];
    selectMode: boolean;
    setSelectMode: Dispatch<SetStateAction<boolean>>;
    trackedItem?: T;
    initialVisible?: number | "all";
}

interface ListActionBase {
    title: string;
    icon?: ReactNode;
}

type ListAction<T> =
    | (ListActionBase & {
        influence?: undefined;
        func: () => void;
    })
    | (ListActionBase & {
        influence: "all" | "selected";
        func: (id: T) => void;
    });

type ItemKey = number | string

export default function SelectableList<T extends ItemKey>({
    data, 
    className, 
    extraActions, 
    selectMode,
    setSelectMode,
    trackedItem,
    initialVisible = 50,
    ...props
}: SelectableListProps<T>) {

    const allItems = Object.keys(data) as T[];

    // SELECT feature
    const [selectedItems, setSelectedItems] = useState<T[]>([]);

    const toggleItem = (id: T) => {
        setSelectedItems(prev =>
            prev?.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const handleActionClick = (action: ListAction<T>) => {
        switch (action.influence) {
            case undefined:
                action.func();
                break;

            case "all":
                allItems.forEach(i => action.func(i));
                break;

            case "selected":
                selectedItems.forEach(i => action.func(i));
                break;
        }
    };

    //LIST OPTIMIZATION FEATURE

    const [visibleCount, setVisiblCount] = useState<number>(() => 
        initialVisible == "all" ? allItems.length : initialVisible
    );

    const visibleItems = allItems.slice(0, visibleCount)

    //SCROLL TO NEEDED feature
    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const scrollToItem = () => {
        itemRefs.current[String(trackedItem)]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    };

    const [isTrackingVisible, setIsTrackingVisible] = useState(false);

    useEffect(() => {
        const element = itemRefs.current[String(trackedItem)];

        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsTrackingVisible(entry.isIntersecting);
        });

        observer.observe(element);

        return () => observer.disconnect();
    }, [trackedItem, visibleItems]);

    // ACTIONS feature

    const actions = useMemo<ListAction<T>[]>(() => {
        let array: ListAction<T>[] = [
            {
                title: "Clean selected",
                func: (id: ItemKey) => setSelectedItems(prev => prev.filter(i => i === id)),
                influence: "selected"
            },
            {
                title: "Select all",
                func: (id: T) => setSelectedItems(prev => !prev?.includes(id) ? ([...prev, id]) : prev),
                influence: "all"
            },
            {
                title: "Cancel",
                func: () => {
                    setSelectMode(false)
                    setSelectedItems([])
                }
            }
        ]

        return array;
    }, [extraActions])

    const renderList = () => {
        return (
            <div className={clsx(styles.list, className, selectMode && styles.open)} {...props}>
                {visibleItems.map(id => (
                    <SelectableItem
                        key={id}
                        id={id}
                        onSelect={toggleItem}
                        selected={selectedItems.includes(id)}
                        selectMode={selectMode}
                        refCallback={el => {
                            itemRefs.current[String(id)] = el;
                        }}
                    >
                        {data[id]}
                    </SelectableItem>
                ))}

                {visibleCount < allItems.length && (
                    <button className={styles.loadMore} onClick={() => setVisiblCount(prev => prev + 50)}>Show more</button>
                )}
            </div>
        )
    }

    const modalRoot = document.getElementById("modal-root");

    return selectMode && modalRoot ? createPortal(
        <div className={styles.menu}>
            <div className={styles.header}>
                <h2>Select tracks</h2>

                <button className={styles.close} onClick={() => setSelectMode(false)}>✖</button>
            </div>

            {renderList()}

            <div className={styles.selectedTracksActions}>

                {actions.map((action) => (
                    <ListAction 
                        onClick={() => handleActionClick(action)}
                        action={action}
                    />
                ))}

                <KebabMenu 
                    actions={extraActions.map(act => ({
                        title: act.title,
                        func: () => handleActionClick(act)
                    }))}
                    className={styles.action}
                />
            </div>
        </div>, modalRoot
    ) : (
        <div className={styles.wrapper}>
            {renderList()}

            <button 
                className={clsx(styles.trackingBtn, trackedItem && !isTrackingVisible && styles.active)} 
                onClick={scrollToItem}
            >
                {"Playing ->"}
            </button>
        </div>
    );
}

function SelectableItem<T extends ItemKey>({
    id,
    children,
    onSelect,
    selectMode,
    selected,
    refCallback
}: {
    id: T;
    children: ReactNode;
    onSelect: (id: T) => void;
    selectMode: boolean;
    selected: boolean;
    refCallback: (el: HTMLDivElement | null) => void;
}) {

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

        if (selectMode) {
            onSelect(id);
        }
    };

    return (
        <div
            ref={refCallback}
            className={clsx(styles.selectableItem, selectMode && styles.selectMode)}
            onClick={selectMode ? handleClick : undefined}
        >
            {selectMode && (
                <input
                    type="checkbox"
                    checked={selected}
                    readOnly
                />
            )}

            {children}
        </div>
    );
}

function ListAction<T extends ItemKey>({ action, onClick }: {
    onClick: () => void,
    action: ListAction<T>
}) {

    return (
        <button 
            onClick={onClick}
            className={styles.action}
        >
            {action.title}
        </button>
    )
}