import styles from "./CollectionProgress.module.css"

export const CollectionProgress = ({ owned, total }: { owned: number; total: number }) => {
    const percentage = Math.round((owned / total) * 100)

    return (
        <div className={styles.progress}>
            <p>
                {owned} of {total} {total === 1 ? "album" : "albums"} in your collection
            </p>
            {/* progress drives accessibility (value/max are announced by screen readers); the fill below is purely visual since native <progress> theming can't be colored reliably across browsers */}
            <progress className={styles["native-bar"]} value={owned} max={total} />
            <div className={styles.track} aria-hidden="true">
                <div className={styles.fill} style={{ width: `${percentage}%` }} />
            </div>
        </div>
    )
}
