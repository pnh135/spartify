import Image from "next/image";
// import { catData } from "@/app/(pages)/profile/page";
import type { album } from "../types/album";
import Link from "next/link";
import { MdOutlinePlayCircleFilled } from "react-icons/md";

interface AlbumListProps {
  albumData: album[];
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
        <div className="flex flex-row overflow-x-scroll flex-nowrap">
          {albumData.map(album => {
            return (
              <Link key={album.title} href={`/detail/${album.title}`}>
                <article className="text-white hover:bg-zinc-800 p-3 rounded-md group">
                  <figure className="w-[180px] h-[180px] overflow-hidden mb-2 rounded-md relative">
                    <Image
                      src={album.image}
                      alt={"ImageAlt"}
                      width={400}
                      height={400}
                      className="w-full h-full bg-gray-500"
                    />
                    <span className="absolute bottom-2 right-2 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-200 transition-transform group-hover:-translate-y-2">
                      <MdOutlinePlayCircleFilled className="text-green-500 text-7xl" />
                    </span>
                  </figure>
                  <h3 className="text-md">{album.title}</h3>
                  <p className="text-sm">{album.artist}</p>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
