import { Release } from "@/app/types";
import styles from "./Content.module.css"
import { ArtistHeader } from "@/app/components/ArtistHeader"
import { ReleaseCard } from "@/app/components/ReleaseCard"
export const Content = ({ releases }: { releases: Release[] }) => {

    if (!releases.length) {
        return <div className={styles.content}>Select a folder to see its albums.</div>;
    }

    const artistName = releases[0].artistName
    const mainReleases = releases.filter((release) => release.category === "master");
    const uncategorizedReleases = releases.filter((release) => release.category === "uncategorized");

    return (
        <div className={styles.content}>
            <ArtistHeader artistName={artistName} />
            <ul>
                {mainReleases.map((release) => (
                    <li key={release.id}>
                        <ReleaseCard release={release} />
                    </li>
                ))}
            </ul>
            {uncategorizedReleases.length > 0 && (
                <>
                    <h3>Uncategorized</h3>
                    <ul>
                        {uncategorizedReleases.map((release) => (
                            <li key={release.id}>
                                <ReleaseCard release={release} />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

