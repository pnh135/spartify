import React from "react";
import Image from "next/image";
import { getAlbum } from "@/app/api/spotify/route";
import { SpotifyTrack } from "@/types/track";
async function AlbumDetailPage({ params }: { params: { id: string } }) {
  const album = await getAlbum(params.id);

  return (
    <main className="bg-zinc-950 rounded-2xl m-6 min-h-screen pb-10">
      <section className="flex flex-col from-zinc-600 to-zinc-800 rounded-t-2xl items-center mb-8 mx-8">
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
        <h2 className="text-2xl font-semibold mb-4 ">수록곡</h2>
        <ul className="space-y-2 ">
          {album.tracks.items.map((track: SpotifyTrack, index: string) => (
            <li
              key={track.id}
              className="border-b pb-2 flex flex-row justify-between"
            >
              <span className="font-medium">
                {index + 1}. {track.name}
              </span>
              <div className="text-md text-gray-500">
                {Math.floor(track.duration_ms / 60000)}:
                {String(
                  Math.floor((track.duration_ms % 60000) / 1000),
                ).padStart(2, "0")}
                분
              </div>
              {track.preview_url && (
                <audio controls className="mt-1">
                  <source src={track.preview_url} type="audio/mpeg" />
                  미리듣기를 지원하지 않는 브라우저입니다.
                </audio>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default AlbumDetailPage;
