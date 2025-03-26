// // 절대 "use client" 금지!
// import { supabase } from "@/app/api/supabase/supabase";
// import { getAlbum } from "@/app/api/spotify/route";
// import AlbumList from "./AlbumList";
// import { SpotifyAlbum } from "@/types/album";

// interface Props {
//   userEmail: string;
// }

// export default async function MyLikeAlbums({ userEmail }: Props) {
//   // Supabase에서 users 테이블에서 user_id 가져오기
//   const { data: userRow } = await supabase
//     .from("users")
//     .select("user_id")
//     .eq("email", userEmail)
//     .single();

//   if (!userRow) return <p className="text-white ml-10">사용자 정보 없음</p>;

//   const { data: likedAlbums } = await supabase
//     .from("liked_albums")
//     .select("album_id")
//     .eq("user_id", userRow.user_id);

//   const albumIds =
//     likedAlbums
//       ?.map(item => item.album_id)
//       .filter((id): id is string => !!id) ?? [];

//   const albums: SpotifyAlbum[] = await Promise.all(
//     albumIds.map(async id => {
//       try {
//         return await getAlbum(id);
//       } catch {
//         return null;
//       }
//     }),
//   ).then(results => results.filter((a): a is SpotifyAlbum => !!a));

//   return <AlbumList albumData={albums} albumListName="좋아요한 앨범" />;
// }
