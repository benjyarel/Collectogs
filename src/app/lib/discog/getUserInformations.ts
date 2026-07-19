import { OauthUser, DiscogUser } from "@/app/types";
import { authentifiedFetch } from "./utils"
export const getUserInformations = async (ressourceUrl: OauthUser["resource_url"]): Promise<DiscogUser> => {
    const response = await authentifiedFetch(ressourceUrl)


    if (!response || !response.ok) {
        throw Error("Error during fetching user informations")
    }

    const data = await response.json();
    return data
}




