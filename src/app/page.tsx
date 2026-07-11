import { FoldersList } from "@/app/components/FoldersList";
import { getDiscogIdentity } from "@/app/lib/discog/getUserIdentity";
import { PageContent } from "./components/PageContent";
export default async function Home() {
  const discogUser = await getDiscogIdentity();

  return (
    <main>
      <PageContent discogUser={discogUser} />
      <FoldersList />
    </main>
  );
}
