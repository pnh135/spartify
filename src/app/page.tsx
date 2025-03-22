import AlbumList from "@/components/AlbumList";
import { catData } from "./(pages)/profile/page";

export default function Home() {
  return (
    <section className="p-5 flex flex-col gap-4">
      <article>
        <AlbumList albumData={catData} albumListName={"좋아요한 곡"} />
      </article>
      <article>
        <p className="text-2xl font-bold">카테고리 1</p>
        {/* 추후 삭제될 태그 */}
        <AlbumList albumData={catData} albumListName={"카테고리1"} />
      </article>
      <article>
        <p className="text-2xl font-bold">카테고리 2</p>
        {/* 추후 삭제될 태그 */}
        <AlbumList albumData={catData} albumListName={"카테고리2"} />
      </article>
    </section>
  );
}
