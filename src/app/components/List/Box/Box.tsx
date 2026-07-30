import { ReactNode } from "react";

import styles from "./Box.module.css";

export const Box = ({ children }: { children: ReactNode }) => {
    return <ul className={styles.box}>{children}</ul>;
};
