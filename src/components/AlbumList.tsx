import Image from "next/image";
// import { catData } from "@/app/(pages)/profile/page";
import type { album } from "../types/album";
import Link from "next/link";

interface AlbumListProps {
  albumdata: album[];
  albumListName: string;
}

export default function AlbumList({
  albumdata,
  albumListName,
}: AlbumListProps) {
  return (
    <section className="ml-8">
      <div className="my-16">
        <h2 className="text-white text-2xl font-bold mb-5">{albumListName}</h2>
        <div className="flex flex-row gap-8 overflow-x-scroll flex-nowrap">
          {albumdata.map(album => {
            return (
              <Link key={album.title} href={`/detail/${album.title}`}>
                <article className="text-white">
                  <figure className="w-[180px] h-[180px] overflow-hidden mb-2">
                    <Image
                      src={album.image}
                      alt={"ImageAlt"}
                      width={400}
                      height={400}
                      className="w-full h-full bg-gray-500"
                    />
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
