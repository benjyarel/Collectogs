import { FoldersList } from "@/app/components/FoldersList";
import { getDiscogIdentity } from "@/app/lib/discog/getUserIdentity";
import { fetchUserInformations } from "@/app/actions/fetchUserInformations"
import { Header } from './components/Header'
export default async function Home() {
  const userIdentity = await getDiscogIdentity();
  const { user } = await fetchUserInformations(userIdentity?.resource_url)

  return (
    <main>
      <Header discogUser={user} />
      {user && <FoldersList username={user.username} />}
    </main>
  );
}
