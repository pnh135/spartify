import { AuthResponse, OAuthResponse } from "@/types/authentication/auth";
import { supabase } from "./supabase";

export const authSignUp = async (
  email: string,
  password: string,
  nickName: string,
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: nickName,
        },
      },
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류";
    throw new Error(`가입 실패: ${errorMessage}`);
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

    if (error) throw new Error(error.message);
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류";
    throw new Error(`로그인 실패: ${errorMessage}`);
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

export const spotifyLogin = async (): Promise<OAuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
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
    throw new Error(`스포티파이 로그인 실패: ${errorMessage}`);
  }
};
