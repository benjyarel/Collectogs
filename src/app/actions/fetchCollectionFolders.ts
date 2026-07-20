"use server";
import { CollectionFolder } from "@/app/types";
import { getCollectionFolders } from "@/app/lib/discog/getCollectionFolders";

export async function fetchCollectionFolders(
  username: string,
): Promise<{ success: boolean; data: CollectionFolder[] }> {
  if (!username) {
    console.log("pas de username")
    return { success: false, data: [] };
  }
  const folders = await getCollectionFolders({ username });

  if (!folders) {
    console.log("pas de folders")
    return { success: false, data: [] };
  }

  return { success: true, data: folders };
}
