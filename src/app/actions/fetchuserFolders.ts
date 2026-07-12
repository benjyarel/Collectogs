"use server";

import { getUserFolders } from "@/app/lib/discog/getUserFolders";

export async function fetchUserFolders(username: string) {
  //
  const folders = await getUserFolders({ username });
  console.log("Dossiers récupérés :", folders);
  if (!folders) {
    return { success: false, error: "No Collection Folders found" };
  }

  return { success: true, data: folders };
}
