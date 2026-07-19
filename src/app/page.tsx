import { FoldersList } from "@/app/components/FoldersList";
import { getDiscogIdentity } from "@/app/lib/discog/getUserIdentity";
import { Header } from './components/Header'
export default async function Home() {
  const discogUser = await getDiscogIdentity();


  return (
    <main>
      <Header discogUser={discogUser} />
      {discogUser && <FoldersList username={discogUser.username} />}
    </main>
  );
}
