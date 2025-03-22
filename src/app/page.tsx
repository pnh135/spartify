// import AlbumList from "@/components/AlbumList";
// import { catData } from "./(pages)/profile/page";

export default function Home() {
  return (
    <section className="p-5 flex flex-col gap-4">
      <article>
        {/* <AlbumList albumData={catData} albumListName={"좋아요한 곡"} /> */}
        <div className="flex flex-row w-full h-1/4 rounded-xl p-4 justify-between gap-4">
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
        </div>
      </article>
      <article>
        <p className="text-2xl font-bold">카테고리 1</p>
        {/* 추후 삭제될 태그 */}
        {/* <AlbumList albumData={catData} albumListName={"카테고리1"} /> */}
        <div className="flex flex-row w-full h-1/4 rounded-xl p-4 justify-between gap-4">
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
        </div>
      </article>
      <article>
        <p className="text-2xl font-bold">카테고리 2</p>
        {/* 추후 삭제될 태그 */}
        {/* <AlbumList albumData={catData} albumListName={"카테고리2"} /> */}
        <div className="flex flex-row w-full h-1/4 rounded-xl p-4 justify-between gap-4">
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
          <div className="w-40 h-40 rounded-md bg-white"></div>
        </div>
      </article>
    </section>
  );
}
