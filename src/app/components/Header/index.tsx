"use client"
import { OauthUser } from "@/app/types";
import styles from "./index.module.css"
export const Header = ({ discogUser }: {
    discogUser: OauthUser | null;
}) => {
    const getRequestToken = async () => {
        try {
            const res = await fetch("/api/discog/auth");

            const textData = await res.text();
            const params = new URLSearchParams(textData);
            const { oauth_token } = Object.fromEntries(params);

            window.location.href = `https://www.discogs.com/oauth/authorize?oauth_token=${oauth_token}`;
        } catch (err) {
            console.error(err);
        }
    };

    console.log(discogUser)
    return (
        <nav>
            <p className={styles.test}>PAGEHEADER</p>
            {discogUser ? <p>Avatar</p> : <button onClick={getRequestToken}>Login</button>}
        </nav>
    )
}