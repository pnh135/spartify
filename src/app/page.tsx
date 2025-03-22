import AlbumList from "@/components/AlbumList";
import { catData } from "./(pages)/profile/page";
import { album } from "@/types/album";

export default function Home() {
  const albumData: album[] = catData;
  return (
    <section className="p-5 flex flex-col gap-4">
      <article>
        <AlbumList albumdata={albumData} />
      </article>
      <article>
        <p className="text-2xl font-bold">카테고리 1</p>
        {/* 추후 삭제될 태그 */}
        <AlbumList albumdata={albumData} />
      </article>
      <article>
        <p className="text-2xl font-bold">카테고리 2</p>
        {/* 추후 삭제될 태그 */}
        <AlbumList albumdata={albumData} />
      </article>
    </section>
  );
}
