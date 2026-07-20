import { getDiscogIdentity } from "@/app/lib/discog/getUserIdentity";
import { fetchUserInformations } from "@/app/actions/fetchUserInformations"
import { Header } from './components/Header'
import { Content } from './components/Content'
import { LeftPanel } from "./components/LeftPanel"
import styles from './page.module.css'
export default async function Home() {
  const userIdentity = await getDiscogIdentity();
  const { user } = await fetchUserInformations(userIdentity?.resource_url)

  if (!user) {
    // TODO Handle initial loading UX
    return null;
  }

  return (
    <main>
      <Header discogUser={user} />
      <div className={styles["page-layout"]}>
        <LeftPanel username={user.username} />
        <Content />
      </div>
    </main>
  );
}



