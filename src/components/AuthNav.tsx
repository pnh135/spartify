"use client";

import { supabase } from "@/app/api/supabase/supabase";
import useUserStore, { handleAuthStateChange } from "@/store/useUserstore";
import Link from "next/link";
import { useEffect } from "react";

const AuthNav = () => {
  // zustand 스토어 에서 상태, 함수 가져오기
  const { user, isLogin, clearUser } = useUserStore();

  // 컴포넌트 마운트 시 인증 상태 변경 리스너 설정
  useEffect(() => {
    // Auth 상태 변경 리스너 설정
    const authListener = handleAuthStateChange();
    
    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // clearUser 함수는 onAuthStateChange 이벤트에 의해 호출되지만,
      // UI를 즉시 업데이트하기 위해 여기서도 호출
      clearUser();
    } catch (error) {
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
