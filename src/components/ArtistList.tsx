import Image from "next/image";
import Link from "next/link";
import { MdOutlinePlayCircleFilled } from "react-icons/md";

interface Artist {
  id: string;
  name: string;
  images: { url: string; width: number; height: number }[];
}

interface ArtistListProps {
  artistsData: Artist[];
  artistListName: string;
}

export default function ArtistList({
  artistsData,
  artistListName,
}: ArtistListProps) {
  return (
    <section className="ml-8">
      <div className="my-16">
        <h2 className="text-white text-2xl font-bold mb-5">{artistListName}</h2>
        <div className="flex flex-row overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar">
          {artistsData?.map(artist => (
            <Link
              key={artist.id}
              href={`/artist/${artist.id}`}
              className="w-[200px] flex-shrink-0 overflow-hidden"
            >
              <article className="text-white hover:bg-zinc-800 p-3 rounded-md group">
                <figure className="w-[180px] h-[180px] overflow-hidden mb-2 rounded-md relative">
                  <Image
                    priority
                    quality={100}
                    src={artist.images[0]?.url ?? "/placeholder.png"}
                    alt={artist.name}
                    width={400}
                    height={400}
                    className="rounded-md object-cover"
                  />
                  <span className="absolute bottom-2 right-2 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-200 transition-transform group-hover:-translate-y-2">
                    <MdOutlinePlayCircleFilled className="text-green-500 text-7xl" />
                  </span>
                </figure>
                <h3 className="text-md truncate">{artist.name}</h3>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
