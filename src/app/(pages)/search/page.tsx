// import { getSearchResults } from "@/app/api/spotify/route";
import { getSearchResults } from "@/utils/spotify";
import AlbumList from "@/components/AlbumList";
import ArtistList from "@/components/ArtistList";
import { SpotifyAlbum } from "@/types/album";
import { SpotifyArtist } from "@/types/artist";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q;

  if (!query) {
    return <p className="text-offwhite p-4">검색어를 입력하세요.</p>;
  }

  const data = await getSearchResults(query);
  const albums: SpotifyAlbum[] = data.albums?.items || [];
  const artists: SpotifyArtist[] = data.artists?.items || [];

  return (
    <main className="p-6 bg-charcoal min-h-screen">
      <span className="text-2xl font-bold text-offwhite mb-6">
        검색 결과: {query}
      </span>
      <ArtistList artistListName="아티스트" artistsData={artists} />
      <AlbumList albumListName="앨범" albumData={albums} />
    </main>
  );
}
