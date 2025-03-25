"use client";

import { supabase } from "@/app/api/supabase/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useState } from "react";

type LikeBtnProps = {
  userId: string;
  albumId: string;
};

const LikeBtn = ({ userId, albumId }: LikeBtnProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  //좋아요 정보 불러오기
  const { isPending, isError, data } = useQuery({
    queryKey: ["likedAlbums", userId, albumId],
    queryFn: async () => {
      const { data: likes, error } = await supabase
        .from("likedAlbums")
        .select("album_id, user_id")
        .eq("album_id", albumId);
      if (error) throw error;
      return likes;
    },
  });

  //좋아요 추가
  const addLikeMutation = useMutation({
    mutationFn: async () => {
      await supabase.from("likedAlbums").insert({
        user_id: userId,
        album_id: albumId,
      });
    },
    onSuccess: () => setLikeCount(prev => prev + 1),
  });

  //좋아요 삭제
  const deleteLikeMutation = useMutation({
    mutationFn: async () => {
      await supabase
        .from("likedAlbums")
        .delete()
        .match({ user_id: userId, album_id: albumId });
    },
    onSuccess: () => setLikeCount(prev => prev - 1),
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
      <button onClick={handleLikeBtn}>{liked ? "취소" : "좋아요"}</button>
    </div>
  );
};

export default LikeBtn;
