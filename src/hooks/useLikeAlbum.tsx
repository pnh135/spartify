"use client";

import { supabase } from "@/app/api/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

function useLikeAlbum() {
  const albumId = "album_id";
  const { data } = useQuery({
    queryKey: ["liked_albums", albumId],
    queryFn: async () => {
      const { data: likesData, error } = await supabase
        .from("liked_albums")
        .select("album_id");

      if (error) throw error;
      return likesData;
    },
  });

  const sortLike = () => {
    let likedRank = {};

    const getLikedNumber = data?.forEach(item => {
      if (likedRank[item.album_id]) {
        likedRank[item.album_id] += 1;
      } else {
        likedRank[item.album_id] = 1;
      }
    });

    const sortLike = getLikedNumber.sort((a, b) => a - b);
    console.log(sortLike);
  };
  return { data, sortLike };
}

export default useLikeAlbum;
