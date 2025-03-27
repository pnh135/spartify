import Image from "next/image";
import type { SpotifyAlbum } from "../types/album";
import Link from "next/link";
import { MdOutlinePlayCircleFilled } from "react-icons/md";

interface AlbumListProps {
  albumData: SpotifyAlbum[];
  albumListName: string;
}

export default function AlbumList({
  albumData,
  albumListName,
}: AlbumListProps) {
  return (
    <section className="ml-8">
      <div className="my-16">
        <h2 className="text-white text-2xl font-bold mb-5">{albumListName}</h2>
        <div className="flex flex-row overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar">
          {albumData.map(album => {
            return (
              <Link
                key={album.id}
                href={`/detail/${album.id}`}
                className="w-[200px] flex-shrink-0 overflow-hidden"
              >
                <article className="text-white hover:bg-zinc-800 p-3 rounded-md group">
                  <figure className="w-[180px] h-[180px] overflow-hidden mb-2 rounded-md relative">
                    {album.images?.[0].url ? (
                      <Image
                        priority
                        quality={100}
                        src={album.images[0].url}
                        alt={album.name}
                        width={400}
                        height={400}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <span className="text-offwhite text-xl flex justify-center items-center w-full h-full text-opacity-30">
                        이미지 없음
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-200 transition-transform group-hover:-translate-y-2">
                      <MdOutlinePlayCircleFilled className="text-green-500 text-7xl" />
                    </span>
                  </figure>
                  <h3 className="text-md truncate">{album.name}</h3>
                  <p className="text-sm truncate">{album.artists[0]?.name}</p>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
