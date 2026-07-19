"use client"
import Link from "next/link"
import { OauthUser } from "@/app/types";
import { LoginButton } from "@/app/components/LoginButton"
import styles from "./index.module.css"
export const Header = ({ discogUser }: {
    discogUser: OauthUser | null;
}) => {


    console.log(discogUser)
    return (
        <nav className={styles["page-header"]}>
            <Link className={styles.logo} href="/" aria-label="Homepage">
                <span className={styles.text}>
                    Collectogs
                </span>
            </Link>
            {discogUser ? <Avatar /> : <LoginButton />}
        </nav>
    )
}



const Avatar = () => {
    return <img alt="username avatar" className={styles.avatar} />
}