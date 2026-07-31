import { use } from "react";

import type { ArtistReleasesResult } from "@/app/actions/fetchArtistReleases";

import { Release } from "@/app/types";

import { ArtistHeader } from "@/app/components/ArtistHeader"
import { ReleaseCard } from "@/app/components/ReleaseCard"

import { sortByYear } from "@/app/lib/sorting/sortByYear"

import styles from "./Content.module.css"

export const Content = ({ releases, allReleasesPromise }: { releases: Release[]; allReleasesPromise: Promise<ArtistReleasesResult> }) => {
    const { releases: allReleases } = use(allReleasesPromise);

    if (!releases.length) {
        return <div className={styles.content}>Select a folder to see its albums.</div>;
    }

    const artistName = releases[0].artistName
    const mainReleases = sortByYear(releases.filter((release) => release.category === "master"));
    const uncategorizedReleases = sortByYear(releases.filter((release) => release.category === "uncategorized"));
    const missingReleases = sortByYear(
        allReleases.filter((master) => !releases.some((release) => release.masterId === master.id))
    );

    return (
        <div className={styles.content}>
            <ArtistHeader artistName={artistName} ownedReleases={mainReleases.length} totalRelease={allReleases.length} />
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
            {missingReleases.length > 0 && (
                <>
                    <h3>Missing albums</h3>
                    <ul>
                        {missingReleases.map((master) => (
                            <li key={master.id}>
                                <ReleaseCard
                                    release={{ id: master.id, title: master.title, year: master.year, thumbImageUrl: master.thumb }}
                                    unactive
                                />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

