import { ReactNode } from "react";

import styles from "./Item.module.css";

export const Item = ({
    isSelected,
    onSelect,
    children,
}: {
    isSelected: boolean;
    onSelect: () => void;
    children: ReactNode;
}) => {
    return (
        <li>
            <button
                type="button"
                className={styles.item}
                aria-current={isSelected}
                onClick={onSelect}
            >
                {children}
            </button>
        </li>
    );
};
