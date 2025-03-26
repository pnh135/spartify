"use client";

import { supabase } from "@/app/api/supabase/supabase";
import useUserStore from "@/store/useUserstore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

// 댓글 컴포넌트용 props 타입 정의
type CommentListProps = {
  albumId: string;
};

// 댓글 수정용 parameter 타입 정의
type EditCommentParams = {
  editComment: string;
  commentId: number;
};

const CommentList = ({ albumId }: CommentListProps) => {
  // zustand에서 유저 정보 가져오기
  const { user } = useUserStore();
  const userId = user?.id;

  //queryClient로 댓글 crud시 캐시 무효화
  const queryClient = useQueryClient();

  //댓글 상태 관리
  const [newComment, setNewComment] = useState("");

  //댓글 정보 불러오기
  const {
    data: comments,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["comments", albumId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("album_id", albumId)
        .order("created_at", { ascending: false });
      if (error) throw error;

      return data;
    },
  });

  //댓글 추가
  const addCommentMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("comments")
        .insert([{ album_id: albumId, user_id: userId, content: newComment }]);
      if (error) throw error;
    },
    onSuccess: () => {
      setNewComment("");
      queryClient.invalidateQueries({ queryKey: ["comments", albumId] }); //입력창 비우고 댓글 새로고침
    },
  });

  //댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: number) => {
      const { error } = await supabase
        .from("comments")
        .delete()
        .match({ id: commentId });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", albumId] });
    },
  });

  //댓글 수정
  const editCommentMutation = useMutation({
    mutationFn: async ({ editComment, commentId }: EditCommentParams) => {
      const { error } = await supabase
        .from("comments")
        .update({ content: editComment })
        .match({ id: commentId });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", albumId] });
      alert("댓글이 수정되었습니다.");
    },
  });

  // 댓글 추가 버튼 핸들러
  const handleAddComment = () => {
    if (!userId) return alert("로그인 후 이용해주세요.");
    if (!newComment.trim()) return alert("댓글 내용을 입력하세요.");
    addCommentMutation.mutate();
  };

  // 댓글 삭제 버튼 클릭 핸들러
  const handleDeleteComment = (commentId: number) => {
    if (!userId) return alert("로그인 후 이용해주세요.");
    deleteCommentMutation.mutate(commentId);
  };

  // 댓글 수정 버튼 핸들러
  const handleEditComment = (commentId: number, currentContent: string) => {
    const updatedContent = prompt(
      "수정할 내용을 입력하세요",
      currentContent,
    )?.trim();
    if (updatedContent) {
      editCommentMutation.mutate({
        editComment: updatedContent,
        commentId,
      });
    }
  };

  if (isPending) return <div>댓글을 불러오는 중...</div>;
  if (isError) return <div>댓글을 불러오는 데 실패했습니다.</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <div className="flex items-center justify-center gap-4">
        <input
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="댓글을 작성해보세요!"
          className="px-4 py-2 w-full max-w-3xl bg-zinc-800 text-white rounded-lg border-1 border-zinc-600"
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600"
        >
          댓글 추가
        </button>
      </div>
      <ul className="mt-4">
        {comments?.map(comment => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() =>
                  handleEditComment(comment.id, comment.content || "")
                }
                className="text-zinc-300 hover:text-white transition duration-300"
              >
                수정
              </button>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="text-zinc-300 hover:text-white transition duration-300"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
