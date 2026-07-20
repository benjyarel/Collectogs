
import { fetchCollectionFolders } from "@/app/actions/fetchCollectionFolders";
import { DiscogUser } from "@/app/types";
import styles from "./index.module.css"
import { FolderSelect } from "@/app/components/FolderSelect";
export const LeftPanel = async ({ username }: { username: DiscogUser["username"] }) => {
    const { data: folders } = await fetchCollectionFolders(username);

    return (
        <div className={"section-block " + styles["left-panel"]}>
            <FolderSelect folders={folders} />
        </div>

    )
}