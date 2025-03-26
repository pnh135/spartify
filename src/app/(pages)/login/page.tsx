"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { authLogin } from "@/app/api/supabase/userAuth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 로그인 폼 유효성 검사를 위한 Zod Schema Definition
const loginFormSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

// 폼 데이터 타입 정의
type LoginFormData = z.infer<typeof loginFormSchema>;

function LoginPage() {
  const router = useRouter();
  const [savedEmail, setSavedEmail] = useState("");

  // localStorage에서 저장된 이메일 가져오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("rememberUserId") || "";
      setSavedEmail(storedEmail);
    }
  }, []);

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 저장된 이메일이 있을 경우 폼에 적용
  useEffect(() => {
    if (savedEmail) {
      setValue("email", savedEmail);
    }
  }, [savedEmail, setValue]);

  // 폼 제출 처리
  const onSubmit = async (data: LoginFormData) => {
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

      // 이메일 저장 (RememberMe 기능)
      if (
        document.getElementById("rememberMe") instanceof HTMLInputElement &&
        (document.getElementById("rememberMe") as HTMLInputElement).checked
      ) {
        localStorage.setItem("rememberUserId", data.email);
      } else {
        localStorage.removeItem("rememberUserId");
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
        <h2 className="text-offwhite text-center font-bold text-2xl">
          Spartify에 로그인하기
        </h2>

        {/* 소셜 로그인 영역 */}
        <button
          type="button"
          className="w-full bg-gunmetal text-offwhite border border-gray-600 hover:border-gray-400 rounded-full py-2 px-4 flex items-center justify-center"
        >
          Google로 계속하기
        </button>

        {/* 구분선 */}
        <div className="w-full border-t border-gray-700"></div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          {/* 이메일 입력 필드 */}
          <div className="w-full">
            <label className="block text-offwhite text-sm mb-1">이메일</label>
            <input
              type="email"
              className="w-full bg-gunmetal text-offwhite border border-offwhite rounded py-2 px-3"
              placeholder="이메일 또는 사용자 이름"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="w-full">
            <label className="block text-offwhite text-sm mb-1">비밀번호</label>
            <input
              type="password"
              className="w-full bg-gunmetal text-offwhite border border-offwhite rounded py-2 px-3"
              placeholder="비밀번호"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* 이메일 기억하기 체크박스 */}
          <div className="flex items-center mt-2">
            <input
              id="rememberMe"
              type="checkbox"
              defaultChecked={Boolean(savedEmail)}
              className="h-4 w-4 text-neongreen rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-offwhite">
              이메일 저장
            </label>
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-neongreen hover:bg-neongreen/80 text-black font-bold rounded-full py-3 mt-4 disabled:bg-gray-500 disabled:text-gray-300"
          >
            로그인
          </button>
        </form>

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