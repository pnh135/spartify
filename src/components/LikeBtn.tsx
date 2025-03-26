"use client";

import { supabase } from "@/app/api/supabase/supabase";
import useUserStore from "@/store/useUserstore";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useState } from "react";

type LikeBtnProps = {
  albumId: string;
};

const LikeBtn = ({ albumId }: LikeBtnProps) => {
  //zustand에서 유저 정보 가져오기
  const { user } = useUserStore();
  const userId = user?.id;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  //좋아요 정보 불러오기
  const { isPending, isError, data } = useQuery({
    queryKey: ["liked_albums", userId, albumId],
    queryFn: async () => {
      const { data: likes, error } = await supabase
        .from("liked_albums")
        .select("album_id, user_id")
        .eq("album_id", albumId);

      if (error) throw error;

      return likes;
    },
  });

  //좋아요 추가
  const addLikeMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("liked_albums")
        .insert({
          user_id: userId,
          album_id: albumId,
        })
        .single();
      if (error) throw error;
    },
    onSuccess: () => setLikeCount(prev => prev + 1),
  });

  //좋아요 삭제
  const deleteLikeMutation = useMutation({
    mutationFn: async () => {
      await supabase
        .from("liked_albums")
        .delete()
        .match({ user_id: userId, album_id: albumId });
    },
    onSuccess: () => setLikeCount(prev => (prev > 0 ? prev - 1 : 0)),
  });

  //좋아요 업데이트
  useEffect(() => {
    if (data) {
      const userLiked = data.find(item => item.user_id === userId);
      setLiked(!!userLiked);
      setLikeCount(data.length);
    }
  }, [data, userId]);

  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div>로딩 실패</div>;

  const handleLikeBtn = () => {
    console.log("여기!!!!!!", userId);
    if (!userId) return alert("로그인 후 이용해주세요.");
    if (liked) {
      deleteLikeMutation.mutate();
    } else {
      addLikeMutation.mutate();
    }
    setLiked(prev => !prev);
  };

  return (
    <div>
      <p>{likeCount}</p>
      <button
        onClick={handleLikeBtn}
        className={`px-4 py-2 rounded-lg text-white ${
          liked ? "bg-red-500" : "bg-gray-500"
        }`}
      >
        {liked ? "취소" : "좋아요"}
      </button>
    </div>
  );
};

export default LikeBtn;
