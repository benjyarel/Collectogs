"use server";
import { CollectionFolder } from "@/app/types";
import { getCollectionFolders } from "@/app/lib/discog/getCollectionFolders";

export async function fetchCollectionFolders(
  username: string,
): Promise<{ success: boolean; folders: CollectionFolder[] }> {
  if (!username) {
    return { success: false, folders: [] };
  }
  const folders = await getCollectionFolders({ username });

  if (!folders) {
    return { success: false, folders: [] };
  }

  return { success: true, folders };
}
