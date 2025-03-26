"use client";

import { supabase } from "@/app/api/supabase/supabase";
import useUserStore, { handleAuthStateChange } from "@/store/useUserstore";
import Link from "next/link";
import { useEffect } from "react";
import Swal from "sweetalert2";

interface SupabaseUnsubscribable {
  unsubscribe: () => void;
}

const AuthNav = () => {
  // zustand 스토어 에서 상태, 함수 가져오기
  const { isLogin, clearUser } = useUserStore();

  // 컴포넌트 마운트 시 인증 상태 변경 리스너 설정
  useEffect(() => {
    let subscription: SupabaseUnsubscribable | null = null;
    
    // 비동기 함수로 인증 상태 변경 리스너 설정
    const setupAuthListener = async () => {
      try {
        const authListener = await handleAuthStateChange();
        subscription = authListener.subscription;
      } catch (error) {
        console.error("인증 리스너 설정 중 오류:", error);
      }
    };
    
    setupAuthListener();
    
    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Log out",
      text: "현재 계정에서 로그아웃됩니다. 계속할까요?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
    });

    if (!result.isConfirmed) return;

    try {
      await supabase.auth.signOut();
      clearUser();
      Swal.fire({
        title: "로그아웃 완료",
        text: "성공적으로 로그아웃되었습니다.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      Swal.fire({
        title: "오류 발생",
        text: "로그아웃 중 문제가 발생했습니다.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <section className="flex gap-7">
      {/* 로그인되지 않았을 때 */}
      {!isLogin && (
        <Link href="/login">
          <p>로그인</p>
        </Link>
      )}

      {/* 로그인되었을 때 */}
      {isLogin && (
        <>
          <button onClick={handleLogout}>
            <p>로그아웃</p>
          </button>
          <Link href="/profile">
            <p>프로필</p>
          </Link>
        </>
      )}
    </section>
  );
};

export default AuthNav;
