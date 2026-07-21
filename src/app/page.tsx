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
    // TODO Handle initial loading UX, with Suspense
    return null;
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



