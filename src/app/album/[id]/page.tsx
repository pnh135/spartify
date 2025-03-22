import { SpotifyAlbum } from "@/types/album";
import Image from "next/image";
async function getAlbumData(id: string): Promise<SpotifyAlbum> {
  const res = await fetch(`http://localhost:3000/api/spotify/album/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch album data");

  return res.json();
}

export default async function AlbumDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const album = await getAlbumData(params.id);

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col items-center">
        <img
          src={album.images?.[0]?.url}
          alt={album.name}
          className="rounded-xl shadow-xl w-64 h-64 object-cover"
        />
        <h1 className="text-3xl font-bold mt-4">{album.name}</h1>
        <p className="text-lg text-gray-600">
          {album.artists.map(a => a.name).join(", ")}
        </p>
      </div>

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
    </div>
  );
}
