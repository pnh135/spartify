"use client";

import { supabase } from "@/app/api/supabase/supabase";
import useUserStore, { handleAuthStateChange } from "@/store/useUserstore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Swal from "sweetalert2";
import SearchBar from "./SearchBar";

interface SupabaseUnsubscribable {
  unsubscribe: () => void;
}

const AuthNav = () => {
  // zustand 스토어 에서 상태, 함수 가져오기
  const { isLogin, setUser } = useUserStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // 컴포넌트 마운트 시 먼저 현재 세션 확인 후 리스너 설정
  useEffect(() => {
    let subscription: SupabaseUnsubscribable | null = null;
   
    const setupAuth = async () => {
      try {
        // 현재 세션을 직접 확인하여 상태 업데이트
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session?.user) {
          console.log("즉시 세션 확인: 사용자 로그인 상태", sessionData.session.user.email);
          setUser(sessionData.session.user);
        } else {
          console.log("즉시 세션 확인: 로그인된 사용자 없음");
        }
        
        // 인증 상태 변경 리스너 설정
        const authListener = await handleAuthStateChange();
        subscription = authListener.subscription;
      } catch (error) {
        console.error("인증 확인 중 오류:", error);
      } finally {
        // 인증 확인 작업 완료
        setIsCheckingAuth(false);
      }
    };
    
    setupAuth();
    
    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [setUser]);

  const pathname: string = usePathname();

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
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  // 인증 확인 중에는 로딩 표시 (선택적)
  if (isCheckingAuth) {
    return (
      <section className="flex gap-7">
        <p className="text-gray-400">로그인 중...</p>
      </section>
    );
  }

  if (pathname === "/login" || pathname === "/signup") return <></>;

  return (
    <nav className="flex h-full justify-between items-center px-4">
      <section>
        <Link href="/" className="flex flex-row justify-center">
          <div className="bg-neongreen border border-transparent w-10 h-10 rounded-full" />
          {/* 로고가 들어갈 곳 */}
          <p className="p-2">Spartify</p>
        </Link>
      </section>
      <section>
        <SearchBar />
      </section>
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
    </nav>
  );
};

export default AuthNav;