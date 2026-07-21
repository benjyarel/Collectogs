import { DiscogsOauthUserIdentity, DiscogsUser } from "@/app/types";
import { authentifiedFetch } from "./utils"
export const getUserInformations = async (ressourceUrl: DiscogsOauthUserIdentity["resource_url"]): Promise<DiscogsUser> => {
    const response = await authentifiedFetch(ressourceUrl)

    if (!response.ok) {
        throw Error("Error during fetching user informations")
    }

    const data = await response.json();
    return data
}




