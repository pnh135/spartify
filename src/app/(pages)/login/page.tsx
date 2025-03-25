"use client";
import Link from "next/link";
import React, { useState } from "react";
import { authLogin } from "@/app/api/supabase/userAuth";
import { useRouter } from "next/navigation";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { user, error } = await authLogin(email, password);

      console.log(user);
      if (error) throw error;
      alert(`환영합니다, ${user?.email}`);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-charcoal px-4">
      {/* 중앙 박스 내부 */}
      <div className="w-full max-w-[350px] lg:max-w-[500px] h-[600px] bg-gunmetal rounded p-10 lg:p-20 flex flex-col items-center justify-center gap-6">
        {/* 로그인 페이지 타이틀 */}
        <h2 className="text-offwhite text-center font-bold text-2xl">
          Spartify에 로그인하기
        </h2>

        {/* 소셜 로그인 영역 */}
        <button className="w-full bg-gunmetal text-offwhite border border-gray-600 hover:border-gray-400 rounded-full py-2 px-4 flex items-center justify-center">
          Google로 계속하기
        </button>

        {/* 구분선 */}
        <div className="w-full border-t border-gray-700"></div>

        {/* 아이디 인풋 태그 */}
        <div className="w-full">
          <label className="block text-offwhite text-sm mb-1">이메일</label>
          <input
            type="email"
            className="w-full bg-gunmetal text-offwhite border border-offwhite rounded py-2 px-3"
            placeholder="이메일 또는 사용자 이름"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* 패스워드 인풋 태그 */}
        <div className="w-full">
          <label className="block text-offwhite text-sm mb-1">비밀번호</label>
          <input
            type="password"
            className="w-full bg-gunmetal text-offwhite border border-offwhite rounded py-2 px-3"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-neongreen hover:bg-neongreen/80 text-black font-bold rounded-full py-3"
        >
          로그인
        </button>

        <div className="text-offwhite text-sm text-center">
          계정이 없나요?{" "}
          <Link href={"/signup"} className="text-offwhite underline">
            Spartify에 가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;