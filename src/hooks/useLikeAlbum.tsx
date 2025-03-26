"use client";

import { supabase } from "@/app/api/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

type arr = [string, number][];

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

  // 중복을 찾아 숫자값 value를 가지는 배열로 반환
  const getLikedNumber = data?.forEach(item => {
    if (likedRank[item.album_id]) {
      likedRank[item.album_id] += 1;
    } else {
      likedRank[item.album_id] = 1;
    }
  });
  // 배열로 변환
  const sortArr: arr = Object.entries(likedRank);
  // 내림차순으로 정렬
  const sortLike = Object.fromEntries(sortArr.sort((a, b) => b[1] - a[1]));
  // 검색하기 위해 문자 배열로 만들기
  const sortString = sortArr.map(([key]) => `${key}`);

  console.log("sortArr", sortArr);
  console.log("sortLike", sortLike);
  console.log("sortString", sortString);

  return sortString;
}

export default useLikeAlbum;
