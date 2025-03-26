import { supabase } from "@/app/api/supabase/supabase";

/**
 * 닉네임 중복 확인 함수
 * @param userName 확인할 닉네임
 * @returns 조회 결과와 에러 객체
 */
export const checkNickname = async (userName: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('user_id')
      .eq('name', userName.trim())
      .limit(1);
    
    return { data, error };
  } catch (error) {
    console.error('닉네임 중복 확인 API 오류:', error);
    return { 
      data: null, 
      error: { message: '서버 오류가 발생했습니다.' } 
    };
  }
};