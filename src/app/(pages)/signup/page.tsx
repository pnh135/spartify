import Link from "next/link";
import React from "react";

function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-charcoal px-4">
      {/* 중앙 박스 내부 */}
      <div className="w-full max-w-[350px] lg:max-w-[500px] h-[600px] bg-gunmetal rounded p-10 lg:p-20 flex flex-col items-center justify-center gap-6"> 
        {/* 로그인 페이지 타이틀 */}
        <h2 className="text-offwhite text-center font-bold text-2xl">
          가입하고 콘텐츠 즐기기
        </h2>

        {/* 서드파티 회원가입 영역 */}
        <button className="w-full bg-gunmetal text-offwhite border border-gray-600 hover:border-gray-400 rounded-full py-2 px-4 flex items-center justify-center">
          Google로 가입하기
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
          />
        </div>

        {/* 패스워드 인풋 태그 */}
        <div className="w-full">
          <label className="block text-offwhite text-sm mb-1">비밀번호</label>
          <input
            type="password"
            className="w-full bg-gunmetal text-offwhite border border-offwhite rounded py-2 px-3"
            placeholder="비밀번호"
          />
        </div>

        {/* 닉네임 인풋 태그 */}
        <div className="w-full">
          <label className="block text-offwhite text-sm mb-1">닉네임</label>
          <input
            type="text"
            className="w-full bg-gunmetal text-offwhite border border-offwhite rounded py-2 px-3"
            placeholder="닉네임"
          />
        </div>

        <button className="w-full bg-neongreen hover:bg-neongreen/80 text-black font-bold rounded-full py-3">
          회원가입
        </button>

        <div className="text-offwhite text-sm text-center">
          계정이 있으신가요?{" "}
          <Link href={"/login"} className="text-offwhite underline">
            Spartify에 로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
