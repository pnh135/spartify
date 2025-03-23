import { getNewRelease } from "./api/spotify/token/route";
import Image from "next/image";
export default async function Home() {
  const newRelease = await getNewRelease();

  console.log(newRelease);

  return (
    <section className="p-5 flex flex-col gap-4">
      <section>
        <span className="font-bold text-2xl p-4">최신 앨범</span>
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap scroll-smooth p-4 hide-scrollbar">
          {newRelease.map(album => (
            <div
              key={album.id}
              className="w-40 flex-shrink-0 rounded-md overflow-hidden"
            >
              <Image
                src={album.images[0]?.url ?? "/placeholder.png"} // 가장 큰 이미지
                alt={album.name}
                width={150}
                height={150}
                className="w-40 h-40 object-cover"
              />
              <div className="p-2">
                <p className="text-sm font-semibold truncate">{album.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {album.artists[0]?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <article>
        <p className="text-2xl font-bold">카테고리 1</p>
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
