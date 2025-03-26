import { supabase } from "@/app/api/supabase/supabase";

export const getUserInfo = async () => {
  // 현재 로그인한 사용자 가져오기
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user?.user) {
    console.error("사용자 정보를 가져오는 중 오류 발생:", userError);
    return null;
  }

  const userId = user.user.id; // 현재 로그인한 사용자의 UID

  // users 테이블에서 현재 로그인한 사용자의 정보 조회
  const { data: userData, error: userDataError } = await supabase
    .from("users")
    .select("*") // 필요한 필드만 선택 가능: .select("name, email, image")
    .eq("user_id", userId) // 현재 로그인한 사용자의 id만 조회
    .single(); // 단일 결과만 반환 (없으면 null)

  if (userDataError) {
    console.error("사용자 데이터 가져오기 실패:", userDataError);
    return null;
  }

  return userData;
};
