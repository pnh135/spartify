"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/app/api/supabase/supabase";
import Swal from "sweetalert2";

interface UserFormProps {
  isLogin: boolean;
  onSubmit: (data: any) => Promise<void>;
}

const UserForm: React.FC<UserFormProps> = ({ isLogin, onSubmit }) => {
  const [checkedDuplication, setCheckedDuplication] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");

  // 로그인 스키마 정의
  const loginSchema = z.object({
    email: z.string().min(1, "이메일을 입력해주세요.").email("유효한 이메일 주소를 입력해주세요."),
    password: z.string().min(1, "비밀번호를 입력해주세요.").min(8, "비밀번호는 8자 이상이어야 합니다."),
  });

  // 회원가입 스키마 정의
  const signupSchema = z
    .object({
      email: z.string().min(1, "이메일을 입력해주세요.").email("유효한 이메일 주소를 입력해주세요."),
      userName: z.string().min(1, "닉네임을 입력해주세요.").min(3, "닉네임은 3글자 이상이어야 합니다."),
      password: z.string().min(1, "비밀번호를 입력해주세요.").min(8, "비밀번호는 8자 이상이어야 합니다."),
      confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요."),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["confirmPassword"],
    });

  // 사용할 스키마 결정
  const formSchema = isLogin ? loginSchema : signupSchema;
  type FormData = z.infer<typeof formSchema>;

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: isLogin
      ? {
          email: "",
          password: "",
        }
      : {
          email: "",
          userName: "",
          password: "",
          confirmPassword: "",
        },
  });

  // 현재 입력값 감시
  const currentEmail = watch("email");
  const currentPassword = watch("password");
  const currentConfirmPassword = !isLogin ? watch("confirmPassword") : "";
  const userNameValue = !isLogin ? watch("userName") : "";

  // 입력값이 비어있을 때 에러 메시지 숨기기
  useEffect(() => {
    if (currentEmail === "") {
      trigger("email");
    }
  }, [currentEmail, trigger]);

  useEffect(() => {
    if (currentPassword === "") {
      trigger("password");
    }
  }, [currentPassword, trigger]);

  useEffect(() => {
    if (!isLogin && currentConfirmPassword === "") {
      trigger("confirmPassword");
    }
  }, [currentConfirmPassword, isLogin, trigger]);

  useEffect(() => {
    if (!isLogin && userNameValue === "") {
      trigger("userName");
    }
  }, [userNameValue, isLogin, trigger]);

  // 로그인 페이지에서만 이메일 저장 기능 사용
  useEffect(() => {
    if (isLogin && typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("rememberUserId") || "";
      setSavedEmail(storedEmail);
    }
  }, [isLogin]);

  // 저장된 이메일이 있을 경우 폼에 적용
  useEffect(() => {
    if (isLogin && savedEmail) {
      setValue("email", savedEmail);
    }
  }, [savedEmail, setValue, isLogin]);

  // 닉네임 중복 확인 (회원가입에서만 사용)
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
    if (!isLogin) {
      setCheckedDuplication(false);
    }
  }, [userNameValue, isLogin]);

  // 폼 제출 처리
  const handleFormSubmit = (data: FormData) => {
    // 회원가입 시 중복 확인 체크
    if (!isLogin && !checkedDuplication) {
      Swal.fire({
        title: "중복 확인 필요",
        text: "닉네임 중복 확인을 해주세요.",
        icon: "warning",
        confirmButtonColor: "#f8c471",
        confirmButtonText: "확인",
      });
      return;
    }

    // 이메일 저장 처리 (로그인 페이지에서만)
    if (isLogin) {
      if (
        document.getElementById("rememberMe") instanceof HTMLInputElement &&
        (document.getElementById("rememberMe") as HTMLInputElement).checked
      ) {
        localStorage.setItem("rememberUserId", data.email);
      } else {
        localStorage.removeItem("rememberUserId");
      }
    }

    // 부모 컴포넌트로 폼 데이터 전달
    onSubmit(data);
  };

  // 에러 메시지를 조건부로 표시하는 함수
  const shouldShowError = (fieldValue: string, errorMessage?: string) => {
    return fieldValue !== "" && errorMessage ? true : false;
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full space-y-2">
      {/* 이메일 입력 필드 */}
      <div className="w-full relative pb-4">
        <label className="block text-offwhite text-sm mb-1">이메일</label>
        <input
          type="email"
          className="w-full bg-gunmetal text-offwhite border border-offwhite rounded py-2 px-3 placeholder:text-xs text-sm"
          placeholder="이메일 또는 사용자 이름"
          {...register("email")}
        />
        {shouldShowError(currentEmail, errors.email?.message) && (
          <p className="absolute -bottom-1 left-0 text-xs text-red-500">{errors.email?.message}</p>
        )}
      </div>

      {/* 비밀번호 입력 필드 */}
      <div className="w-full relative pb-4">
        <label className="block text-offwhite text-sm mb-1">비밀번호</label>
        <input
          type="password"
          className="w-full bg-gunmetal text-offwhite border border-offwhite rounded py-2 px-3 placeholder:text-xs text-sm"
          placeholder="비밀번호"
          {...register("password")}
        />
        {shouldShowError(currentPassword, errors.password?.message) && (
          <p className="absolute -bottom-1 left-0 text-xs text-red-500">{errors.password?.message}</p>
        )}
      </div>

      {/* 회원가입 전용 필드 */}
      {!isLogin && (
        <>
          {/* 비밀번호 확인 필드 */}
          <div className="w-full relative pb-4">
            <label className="block text-offwhite text-sm mb-1">비밀번호 확인</label>
            <input
              type="password"
              className="w-full bg-gunmetal text-offwhite border border-offwhite rounded py-2 px-3 placeholder:text-xs text-sm"
              placeholder="비밀번호 확인"
              {...register("confirmPassword")}
            />
            {shouldShowError(currentConfirmPassword, (errors as any).confirmPassword?.message) && (
              <p className="absolute -bottom-1 left-0 text-xs text-red-500">
                {(errors as any).confirmPassword?.message}
              </p>
            )}
          </div>

          {/* 닉네임 입력 필드 */}
          <div className="w-full relative pb-4">
            <label className="block text-offwhite text-sm mb-1">닉네임</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full text-md bg-gunmetal text-offwhite border border-offwhite rounded py-2 px-3 placeholder:text-xs text-sm"
                placeholder="닉네임"
                {...register("userName")}
              />
              <button
                type="button"
                onClick={onHandleDuplication}
                disabled={!userNameValue || userNameValue.length < 3 || isChecking}
                className="px-2 text-xs bg-neongreen text-black rounded disabled:bg-gray-500 disabled:text-gray-300 whitespace-nowrap"
              >
                {isChecking ? "확인 중.." : "중복 확인"}
              </button>
            </div>
            <div className="absolute -bottom-1 left-0 right-0">
              {shouldShowError(userNameValue, (errors as any).userName?.message) && (
                <p className="text-xs text-red-500">{(errors as any).userName?.message}</p>
              )}
              {checkedDuplication && (
                <p className="text-xs text-green-500">사용 가능한 닉네임입니다.</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* 이메일 기억하기 체크박스 (로그인에서만) */}
      {isLogin && (
        <div className="flex items-center mt-2">
          <input
            id="rememberMe"
            type="checkbox"
            defaultChecked={Boolean(savedEmail)}
            className="h-4 w-4 text-neongreen rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-xs text-offwhite">
            이메일 저장
          </label>
        </div>
      )}

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={!isValid || (!isLogin && !checkedDuplication)}
        className="w-full bg-neongreen hover:bg-neongreen/80 text-black rounded-full py-3 mt-4 disabled:bg-gray-500 disabled:text-gray-300"
      >
        {isLogin ? "로그인" : "회원가입"}
      </button>
    </form>
  );
};

export default UserForm;