"use client"

import { CollectionFolder } from "@/app/types";

import { List } from "@/app/components/List";

import styles from "./FolderSelect.module.css";

export const FolderSelect = ({
    folders,
    selectedFolderId,
    onSelect,
}: {
    folders: CollectionFolder[];
    selectedFolderId: CollectionFolder["id"] | null;
    onSelect: (folderId: CollectionFolder["id"]) => void;
}) => {
    return (
        <div className="field">
            <h2 className={styles.title}>Folders</h2>
            <List.Box>
                {folders.map(({ id, name, count }) => (
                    <List.Item key={id} isSelected={id === selectedFolderId} onSelect={() => onSelect(id)}>
                        <span className={styles.label}>{name}</span>
                        <span className={styles.count}>{count}</span>
                    </List.Item>
                ))}
            </List.Box>
        </div>
    )
}
