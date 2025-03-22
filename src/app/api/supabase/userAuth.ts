import { supabase } from "./supabase";

export const authSignUp = async (email, password, nickName) => {
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
  } catch (error) {
    throw new Error(`가입 실패: ${error.message}`);
  }
};

export const authLogin = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(`로그인 실패: ${error.message}`);
  }
};

export const authLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error(`로그아웃 실패: ${error.message}`);
  }
};

export const googleLogin = async () => {
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
  } catch (error) {
    if (error) throw new Error(`구글 로그인 실패: ${error.message}`);
  }
};

export const spotifyLogin = async () => {
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
  } catch (error) {
    if (error) throw new Error(`스포티파이 로그인 실패: ${error.message}`);
  }
};