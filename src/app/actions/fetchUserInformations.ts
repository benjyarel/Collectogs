"use server";

import { DiscogsOauthUserIdentity } from "../types";
import { getUserInformations } from "@/app/lib/discog/getUserInformations"
export const fetchUserInformations = async (
    resourceUrl?: DiscogsOauthUserIdentity["resource_url"]
) => {
    if (!resourceUrl) {
        console.warn("No ressource url provided to fetchUserInformations");
        return { success: false, user: null };
    }
    const data = await getUserInformations(resourceUrl)

    return {
        sucess: true,
        user: data
    }

}