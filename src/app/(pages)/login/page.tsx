"use client";

import Link from "next/link";
import React from "react";
import { authLogin } from "@/app/api/supabase/userAuth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import UserForm from "@/components/auth/UserForm";
import ThirdPartyLoginButton from "@/components/auth/ThirdPartyLoginButton";

function LoginPage() {
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const { user, error } = await authLogin(data.email, data.password);

      if (error) {
        Swal.fire({
          title: "로그인 실패",
          text: error || "로그인 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "확인",
        });
        throw error;
      }

      await Swal.fire({
        title: "로그인 성공!",
        text: `${user?.user_metadata.name}님, 환영합니다!`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-charcoal px-4">
      {/* 중앙 박스 내부 */}
      <div className="w-full max-w-[350px] lg:max-w-[500px] h-auto bg-gunmetal rounded p-10 lg:p-20 flex flex-col items-center justify-center gap-6">
        {/* 로그인 페이지 타이틀 */}
        <h2 className="text-offwhite text-center font-semibold text-2xl">
          Spartify에 로그인
        </h2>

        {/* 소셜 로그인 영역 */}
        <ThirdPartyLoginButton />

        {/* 구분선 */}
        <div className="w-full border-t border-gray-700"></div>

        {/* 로그인 폼 */}
        <UserForm isLogin={true} onSubmit={handleLogin} />

        <div className="text-offwhite text-sm text-center">
          계정이 없나요?{" "}
          <Link href={"/signup"} className="text-neongreen font-bold underline">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
