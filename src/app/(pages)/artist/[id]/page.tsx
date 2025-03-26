import Image from "next/image";
import { getArtist, getArtistAlbum } from "@/app/api/spotify/route";
import AlbumList from "@/components/AlbumList";
export default async function ArtistDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const artist = await getArtist(params.id);
  const artistAlbum = await getArtistAlbum(params.id);
  const albums = artistAlbum.items;
  return (
    <main className="bg-zinc-950 rounded-2xl m-6 min-h-screen pb-10">
      <section className="flex flex-col items-center mb-8 mx-8">
        <Image
          priority
          quality={100}
          src={artist.images?.[0]?.url ?? "/placeholder.png"}
          alt={artist.name}
          width={350}
          height={350}
          className="bg-white rounded-sm p-2 m-8"
        />

        <div className="text-white w-full p-4">
          <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
          <p className="text-md text-gray-400 mb-1">
            장르: {artist.genres.length > 0 ? artist.genres.join(", ") : "없음"}
          </p>
        </div>
        <article className="ml-8 max-w-full  overflow-hidden">
          <AlbumList albumListName="아티스트의 앨범" albumData={albums} />
        </article>
      </section>
    </main>
  );
}
