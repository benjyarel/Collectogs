import { getDiscogIdentity } from "@/app/lib/discog/getUserIdentity";
import { fetchUserInformations } from "@/app/actions/fetchUserInformations"
import { fetchCollectionFolders } from "@/app/actions/fetchCollectionFolders";

import { Header } from '@/app/components/Header'
import { CollectionManager } from '@/app/components/CollectionManager'

import styles from './page.module.css'

export default async function Home() {
  const userIdentity = await getDiscogIdentity();
  const { user } = await fetchUserInformations(userIdentity?.resource_url)

  if (!user) {
    return (<UnloggedHome />)
  }

  const { data: folders } = await fetchCollectionFolders(user.username);

  return (
    <main className={styles.page}>
      <Header discogUser={user} />
      <div className={styles["page-layout"]}>
        <CollectionManager username={user.username} folders={folders} />
      </div>
    </main>
  );
}

const UnloggedHome = () => {
  return (
    <main className={styles.page}>
      <Header />
      <div className={styles["page-layout"]}>
        <div className={"section-block " + styles["empty-left-panel"]}></div>
        <div className={"section-block " + styles["empty-content"]}></div>
      </div>
    </main>
  )
}



