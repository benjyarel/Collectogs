import { CollectionProgress } from "@/app/components/CollectionProgress"

import styles from "./ArtistHeader.module.css"

export const ArtistHeader = ({
    artistName,
    ownedReleases,
    totalRelease,
}: {
    artistName: string;
    ownedReleases: number;
    totalRelease: number;
}) => {
    return (
        <div className={styles.header}>
            <p>Artist</p>
            <h2>{artistName}</h2>
            {totalRelease > 0 && (
                <CollectionProgress owned={ownedReleases} total={totalRelease} />
            )}
        </div>
    )
}
