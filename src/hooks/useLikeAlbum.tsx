"use client";

import { supabase } from "@/app/api/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

// const type arr = {string || number}

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

  let likedRank = {};

  const getLikedNumber = data?.forEach(item => {
    if (likedRank[item.album_id]) {
      likedRank[item.album_id] += 1;
    } else {
      likedRank[item.album_id] = 1;
    }
  });
  const sortArr = Object.entries(likedRank);
  const sortLike = Object.fromEntries(sortArr.sort((a, b) => b[1] - a[1]));
  console.log("sortArr", sortArr);
  console.log("sortLike", sortLike);
  return { data, getLikedNumber };
}

export default useLikeAlbum;
