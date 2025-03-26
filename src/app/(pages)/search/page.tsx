import { getSearchResults } from "@/app/api/spotify/route";
import AlbumList from "@/components/AlbumList";
import ArtistList from "@/components/ArtistList";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q;

  if (!query) {
    return <p className="text-white p-4">검색어를 입력하세요.</p>;
  }

  const data = await getSearchResults(query);
  const albums = data.albums?.items || [];
  const artists = data.artists?.items || [];

  return (
    <main className="p-6 bg-zinc-900 min-h-screen">
      <span className="text-2xl font-bold text-white mb-6">
        검색 결과: {query}
      </span>
      <ArtistList artistListName="아티스트" artistsData={artists} />
      <AlbumList albumListName="앨범" albumData={albums} />
    </main>
  );
}
