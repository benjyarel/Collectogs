import { Release } from "@/app/types";
import styles from "./Content.module.css"

export const Content = ({ releases }: { releases: Release[] }) => {
    if (!releases.length) {
        return <div className={"section-block " + styles.content}>Select a folder to see its albums.</div>;
    }

    const mainReleases = releases.filter((release) => release.category === "master");
    const uncategorizedReleases = releases.filter((release) => release.category === "uncategorized");

    return (
        <div className={"section-block " + styles.content}>
            <ul>
                {mainReleases.map((release) => (
                    <li key={release.id}>
                        {release.title} ({release.year})
                    </li>
                ))}
            </ul>
            {uncategorizedReleases.length > 0 && (
                <>
                    <h3>Uncategorized</h3>
                    <ul>
                        {uncategorizedReleases.map((release) => (
                            <li key={release.id}>
                                {release.title} ({release.year})
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}