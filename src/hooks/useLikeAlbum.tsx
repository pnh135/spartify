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

  return { data };
}

export default useLikeAlbum;
