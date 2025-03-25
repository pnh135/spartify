import React from "react";
import Image from "next/image";
import { getAlbum } from "@/app/api/spotify/route";
// import { SpotifyTrack } from "@/types/track";
import TrackList from "@/components/TrackList";
async function AlbumDetailPage({ params }: { params: { id: string } }) {
  const album = await getAlbum(params.id);
  console.log(album.tracks);
  return (
    <main className=" bg-zinc-950 rounded-2xl m-4 sm:m-6 min-h-screen pb-10">
      <section className=" flex flex-col  from-zinc-600 to-zinc-800 rounded-t-2xl  items-center mb-8 mx-4 sm:mx-8 ">
        <Image
          priority
          quality={10}
          src={album.images?.[0]?.url}
          alt={album.name}
          width={350}
          height={350}
          className=" bg-white rounded-sm  p-2 m-8"
        />
        <div className="flex flex-col justify-between text-white w-full p-4 ">
          <h1 className="text-2xl font-black mt-3">{album.name}</h1>
          <p className="opacity-40 pt-2">{album.artists[0].name}</p>
        </div>
      </section>

      <div className="p-4">
        <TrackList tracks={album.tracks.items} />
      </div>
    </main>
  );
}

export default AlbumDetailPage;
