"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { authSignUp } from "@/app/api/supabase/userAuth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/app/api/supabase/supabase";

// 유효성 검사를 위한 Zod Schema Definition
const formSchema = z
  .object({
    email: z.string().email("유효한 이메일 주소를 입력해주세요."),
    userName: z.string().min(3, "닉네임은 3글자 이상이어야 합니다."),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

// 폼 데이터 타입 정의
type FormData = z.infer<typeof formSchema>;

function SignupPage() {
  const router = useRouter();
  const [checkedDuplication, setCheckedDuplication] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 입력값 모니터링
  const userNameValue = watch("userName");

 const checkNickname = async (userName: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("user_id")
        .eq("name", userName.trim())
        .limit(1);

      return { data, error };
    } catch (error) {
      console.error("닉네임 중복 확인 API 오류:", error);
      return {
        data: null,
        error: { message: "서버 오류가 발생했습니다." },
      };
    }
  };

  // 닉네임 중복 확인
  const onHandleDuplication = async () => {
    if (!userNameValue) return;
    
    try {
      setIsChecking(true);
      const { data, error } = await checkNickname(userNameValue);

      if (error) {
        throw new Error(error.message);
      }

      const duplicated = Array.isArray(data) && data.length > 0;

      if (duplicated) {
        Swal.fire({
          title: "닉네임 중복",
          text: "이미 사용된 닉네임입니다.",
          icon: "warning",
          confirmButtonColor: "#f8c471",
          confirmButtonText: "확인",
        });
        setCheckedDuplication(false);
      } else {
        Swal.fire({
          title: "사용 가능",
          text: "사용 가능한 닉네임입니다.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
        setCheckedDuplication(true);
      }
    } catch (error) {
      console.error('닉네임 확인 오류:', error);
      Swal.fire({
        title: "오류 발생",
        text: "중복 확인 중 오류가 발생했습니다.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "확인",
      });
    } finally {
      setIsChecking(false);
    }
  };
  
  // 닉네임 변경 시 중복 확인 상태 초기화
  useEffect(() => {
    setCheckedDuplication(false);
  }, [userNameValue]);

  // 폼 제출 처리
  const onSubmit = async (data: FormData) => {
    // 닉네임 중복 확인이 되지 않았으면 제출 불가
    if (!checkedDuplication) {
      Swal.fire({
        title: "중복 확인 필요",
        text: "닉네임 중복 확인을 해주세요.",
        icon: "warning",
        confirmButtonColor: "#f8c471",
        confirmButtonText: "확인",
      });
      return;
    }
    
    try {
      // 회원가입 API 호출
      const { error } = await authSignUp(data.email, data.password, data.userName);

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
    } catch (error) {
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
      <div className="w-full max-w-[350px] lg:max-w-[500px] h-auto bg-gunmetal rounded p-10 lg:p-20 flex flex-col items-center justify-center gap-6">
        {/* 로그인 페이지 타이틀 */}
        <h2 className="text-offwhite text-center font-bold text-2xl mb-4">
          가입하고 콘텐츠 즐기기
        </h2>

        {/* 서드파티 회원가입 영역 */}
        <button className="w-full bg-gunmetal text-offwhite border border-gray-600 hover:border-gray-400 rounded-full py-2 px-4 flex items-center justify-center">
          Google로 가입하기
        </button>

        {/* 구분선 */}
        <div className="w-full border-t border-gray-700 my-2"></div>

        {/* 회원가입 폼 */}
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

          {/* 비밀번호 확인 필드 */}
          <div className="w-full">
            <label className="block text-offwhite text-sm mb-1">비밀번호 확인</label>
            <input
              type="password"
              className="w-full bg-gunmetal text-offwhite border border-offwhite rounded py-2 px-3"
              placeholder="비밀번호 확인"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* 닉네임 입력 필드 */}
          <div className="w-full">
            <label className="block text-offwhite text-sm mb-1">닉네임</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full text-md bg-gunmetal text-offwhite border border-offwhite rounded py-2 px-3"
                placeholder="닉네임"
                {...register("userName")}
              />
              <button
                type="button"
                onClick={onHandleDuplication}
                disabled={!userNameValue || userNameValue.length < 3 || isChecking}
                className="px-4 py-2 text-sm bg-neongreen text-black rounded disabled:bg-gray-500 disabled:text-gray-300 whitespace-nowrap"
              >
                {isChecking ? "확인 중.." : "중복 확인"}
              </button>
            </div>
            {errors.userName && (
              <p className="mt-1 text-sm text-red-500">{errors.userName.message}</p>
            )}
            {checkedDuplication && (
              <p className="mt-1 text-sm text-green-500">사용 가능한 닉네임입니다.</p>
            )}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={!isValid || !checkedDuplication}
            className="w-full bg-neongreen hover:bg-neongreen/80 text-black font-bold rounded-full py-3 mt-4 disabled:bg-gray-500 disabled:text-gray-300"
          >
            회원가입
          </button>
        </form>

        <div className="text-offwhite text-sm text-center mt-4">
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