"use client"

import Link from "next/link"

import { DiscogsUser } from "@/app/types";

import { LoginButton } from "@/app/components/LoginButton"

import styles from "./Header.module.css"

export const Header = ({ discogUser }: {
    discogUser?: DiscogsUser;
}) => {

    return (
        <nav className={styles["page-header"]}>
            <Link className={styles.logo} href="/" aria-label="Homepage">
                <span className={styles.text}>
                    Collectogs
                </span>
            </Link>
            {discogUser ? <Avatar url={discogUser.avatar_url} /> : <LoginButton />}
        </nav>
    )
}



const Avatar = ({ url }: { url: DiscogsUser["avatar_url"] }) => {
    return <img alt="user avatar" className={styles.avatar} src={url} />
}