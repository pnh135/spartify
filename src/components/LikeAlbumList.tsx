import { supabase } from "@/app/api/supabase/supabase";
import { getAlbum } from "@/app/api/spotify/route";
import AlbumList from "./AlbumList";
import { SpotifyAlbum } from "@/types/album";

export default async function LikeAlbumList() {
  const { data } = await supabase.from("liked_albums").select("album_id");

  const likedRank: Record<string, number> = {};
  data?.forEach(item => {
    if (item.album_id) {
      likedRank[item.album_id] = (likedRank[item.album_id] || 0) + 1;
    }
  });

  const albumIds = Object.entries(likedRank)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);

  const albums: SpotifyAlbum[] = await Promise.all(
    albumIds.map(id => getAlbum(id)),
  );

  return <AlbumList albumData={albums} albumListName="좋아요 순위" />;
}
