"use client";

import Link from "next/link";
import React from "react";
import { authSignUp } from "@/app/api/supabase/userAuth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import UserForm from "@/components/auth/UserForm";

function SignupPage() {
  const router = useRouter();

  useLikeAlbum();

  const handleSignup = async (data: {
    email: string;
    password: string;
    userName: string;
  }) => {
    try {
      // 회원가입 API 호출
      const { error } = await authSignUp(
        data.email,
        data.password,
        data.userName,
      );

      if (error) {
        Swal.fire({
          title: "회원가입 실패",
          text: error || "회원가입 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "확인",
        });
        return;
      }

      await Swal.fire({
        title: "회원가입 완료!",
        text: "이메일 인증 후 로그인해주세요.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });

      router.push("/login");
    } catch (error: any) {
      Swal.fire({
        title: "오류 발생",
        text: `${error}` || "알 수 없는 오류가 발생했습니다.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-charcoal px-4">
      {/* 중앙 박스 내부 */}
      <div className="w-full max-w-[350px] lg:max-w-[500px] h-[700px] bg-gunmetal rounded p-10 lg:p-20 flex flex-col items-center justify-center gap-6">
        {/* 회원가입 페이지 타이틀 */}
        <h2 className="text-offwhite text-center font-semibold text-2xl mb-4">
          가입하고 콘텐츠 즐기기
        </h2>

        {/* 서드파티 회원가입 영역 */}
        <button className="w-full bg-gunmetal text-offwhite border border-gray-600 hover:border-gray-400 rounded-full py-2 px-4 flex items-center justify-center text-sm">
          Google로 가입하기
        </button>

        {/* 구분선 */}
        <div className="w-full border-t border-gray-700 my-2"></div>

        {/* 회원가입 폼 */}
        <UserForm isLogin={false} onSubmit={handleSignup} />

        <div className="text-offwhite text-sm text-center mt-4">
          계정이 있으신가요?{" "}
          <Link href={"/login"} className="text-neongreen font-bold underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
