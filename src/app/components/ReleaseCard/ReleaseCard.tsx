import { Release } from "@/app/types"
import styles from './ReleaseCard.module.css'

type ReleaseCardData = Pick<Release, "id" | "title" | "year" | "thumbImageUrl">;

export const ReleaseCard = ({ release }: { release: ReleaseCardData }) => {
    return (
        <div className={styles.card}>
            <img className={styles["cover-picture"]} src={release.thumbImageUrl} alt={`cover picture of album ${release.title}`} />
            <div>
                <p className={styles["release-title"]}>{release.title}</p>
                {release.year ? (<p>{release.year}</p>) : (<p>----</p>)}
            </div>
        </div >
    )
}