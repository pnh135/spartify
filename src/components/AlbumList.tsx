import Image from "next/image";
// import { catData } from "@/app/(pages)/profile/page";
import type { album } from "@/types/album";

interface AlbumListProps {
  albumdata: album[];
}

export default function AlbumList({ albumdata }: AlbumListProps) {
  return (
    <section className="ml-8">
      <div className="my-16">
        <h2 className="text-white text-2xl font-bold mb-5">좋아요한 앨범</h2>
        <div className="flex flex-row gap-8 overflow-x-scroll flex-nowrap">
          {albumdata.map(data => {
            return (
              <div key={data.title} className="text-white">
                <div className="w-[180px] h-[180px] overflow-hidden mb-2">
                  <Image
                    src={data.image}
                    alt={"ImageAlt"}
                    width={400}
                    height={400}
                    className="w-full h-full bg-gray-500"
                  />
                </div>
                <h3 className="text-md">{data.title}</h3>
                <p className="text-sm">{data.artist}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
