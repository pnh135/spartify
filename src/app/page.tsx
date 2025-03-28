import AlbumList from "@/components/AlbumList";
import ArtistList from "@/components/ArtistList";
// import {
//   getSeveralArtist,
//   getPublicAccessToken,
//   getNewRelease,
// } from "@/app/api/spotify/route";
import {
  getSeveralArtist,
  getPublicAccessToken,
  getNewRelease,
} from "@/utils/spotify";
import { SpotifyAlbum } from "@/types/album";
import LikeAlbumList from "@/components/LikeAlbumList";

export default async function Home() {
  const token: string = await getPublicAccessToken();
  const newRelease: SpotifyAlbum[] = await getNewRelease();
  const albums: SpotifyAlbum[] = await getNewRelease();
  const artistIds: string[] = albums.map(album => album.artists[0].id);
  const artists = await getSeveralArtist(artistIds, token);

  return (
    <section className="p-2 flex flex-col gap-4">
      <article>
        <AlbumList albumListName="최신앨범" albumData={newRelease} />
      </article>

      <article>
        <ArtistList
          artistsData={artists.artists}
          artistListName="최신 아티스트"
        />
      </article>
      <article>
        <LikeAlbumList />
      </article>
    </section>
  );
}
