"use client"
import Link from "next/link"
import { OauthUser } from "@/app/types";
import styles from "./index.module.css"
export const Header = ({ discogUser }: {
    discogUser: OauthUser | null;
}) => {


    console.log(discogUser)
    return (
        <nav className={styles["page-header"]}>
            <Logo />
            {discogUser ? <Avatar /> : <LoginButton />}
        </nav>
    )
}

const Logo = () => {
    return (
        <Link className={styles.logo} href="/" aria-label="Homepage">
            <span className={styles.text}>
                Collectogs
            </span>
        </Link>
    );
}

const LoginButton = () => {
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
    return <button className={styles.btn} onClick={getRequestToken}>Login</button>
}

const Avatar = () => {
    return <span className={styles.avatar}></span>
}