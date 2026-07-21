import { Release } from "@/app/types";
import styles from "./index.module.css"

export const Content = ({ releases }: { releases: Release[] }) => {
    if (!releases.length) {
        return <div className={"section-block " + styles.content}>Select a folder to see its albums.</div>;
    }

    return (
        <div className={"section-block " + styles.content}>
            <ul>
                {releases.map((release) => (
                    <li key={release.masterId}>
                        {release.title} ({release.year})
                    </li>
                ))}
            </ul>
        </div>
    )
}