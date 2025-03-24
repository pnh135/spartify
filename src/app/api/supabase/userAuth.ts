import { AuthResponse, OAuthResponse } from "@/types/authentication/auth";
import { supabase } from "./supabase";
import { TablesInsert } from "@/types/authentication/supabase";

export const authSignUp = async (
  email: string,
  password: string,
  nickName: string,
): Promise<AuthResponse> => {
  try {
    // 1단계: Supabase Auth에 회원 등록
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: nickName,
        },
      },
    });

    if (error || !data.user) {
      return {
        user: null,
        session: null,
        error: error?.message || "회원가입 실패",
      };
    }

    // 2단계: public.users 테이블에 추가 정보 저장
    const profile: TablesInsert<"users"> = {
      user_id: data.user.id,
      email: email,
      name: nickName,
      created_at: new Date().toISOString(),
    };

    const { error: profileError } = await supabase
      .from("users")
      .insert(profile);

    if (profileError) {
      return { user: null, session: null, error: profileError.message };
    }

    return {
      user: data.user,
      session: data.session,
      error: null,
    };
    if (error || !data.user) {
      return {
        user: null,
        session: null,
        error: error?.message || "회원가입 실패",
      };
    }

    // 2단계: public.users 테이블에 추가 정보 저장
    const profile: TablesInsert<"users"> = {
      user_id: data.user.id,
      email: email,
      name: nickName,
      created_at: new Date().toISOString(),
    };

    const { error: profileError } = await supabase
      .from("users")
      .insert(profile);

    if (profileError) {
      return { user: null, session: null, error: profileError.message };
    }

    return {
      user: data.user,
      session: data.session,
      error: null,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류";
    return {
      user: null,
      session: null,
      error: `가입 실패: ${errorMessage}`,
    };
  }
};

export const authLogin = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, session: null, error: error.message };
    }

    return {
      user: data.user,
      session: data.session,
      error: null,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류";
    return {
      user: null,
      session: null,
      error: `로그인 실패: ${errorMessage}`,
    };
  }
};
export const authLogout = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류";
    throw new Error(`로그아웃 실패: ${errorMessage}`);
  }
};

export const googleLogin = async (): Promise<OAuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류";
    throw new Error(`구글 로그인 실패: ${errorMessage}`);
  }
};
