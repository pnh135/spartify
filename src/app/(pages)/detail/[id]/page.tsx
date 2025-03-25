import React from "react";
// import AlbumList from "@/components/AlbumList";
import Image from "next/image";
import { SpotifyAlbum } from "@/types/album";

async function getAlbumData(id: string): Promise<SpotifyAlbum> {
  const res = await fetch(`http://localhost:3000/api/spotify/album/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch album data");

  return res.json();
}

async function AlbumDetailPage({ params }: { params: { id: string } }) {
  const album = await getAlbumData(params.id);

  return (
    <main className=" bg-zinc-950 rounded-2xl m-4 sm:m-6 min-h-screen pb-10">
      <section className=" flex flex-col  from-zinc-600 to-zinc-800 rounded-t-2xl  items-center mb-8 mx-4 sm:mx-8 ">
        <Image
          src={album.images?.[0]?.url}
          alt={album.name}
          width={800}
          height={300}
          className=" bg-gray-500"
        />
        <div className="flex flex-row justify-between text-white w-full p-4 ">
          <h1 className="text-7xl font-black mt-3">Artist</h1>
          <p className="text-lg text-gray-600">
            {album.artists.map(a => a.name).join(", ")}
          </p>
          {/* <p className="text-[14px] font-normal mt-2">발매일</p> */}
        </div>
      </section>

      <div>
        <h2 className="text-2xl font-semibold mb-4">수록곡</h2>
        <ul className="space-y-2">
          {album.tracks.items.map((track, idx) => (
            <li key={track.id} className="border-b pb-2">
              <span className="font-medium">
                {idx + 1}. {track.name}
              </span>
              <div className="text-sm text-gray-500">
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
