import AlbumList from "@/components/AlbumList";
import { getNewRelease } from "./api/spotify/token/route";
export default async function Home() {
  const newRelease = await getNewRelease();

  return (
    <section className="p-5 flex flex-col gap-4">
      <article>
        <AlbumList albumListName={"최신 앨범"} albumData={newRelease} />
      </article>
      <article>
        <AlbumList albumListName={"카테고리 1"} albumData={newRelease} />
      </article>
      <article>
        <AlbumList albumListName={"카테고리 2"} albumData={newRelease} />
      </article>
    </section>
  );
}
