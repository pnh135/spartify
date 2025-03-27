// 이 함수를 실행할 떄 status: 401(unauthorized)이 나오면 RLS 관련 문제

import { supabase } from "@/app/api/supabase/supabase";

interface userDataType {
  name: string;
  email: string;
  profileImg: string;
}

export const handleUpdateUserData = async ({
  name,
  email,
  profileImg,
}: userDataType) => {
  const { data: upsertData, error: upsertError } = await supabase
    .from("users")
    .upsert([
      {
        name: name,
        email: email,
        profile_img: profileImg,
      },
    ]); // 해석: .from('posts') = posts라는 이름의 테이블에서 -> .insert(post) = post라는 이름으로 새로운 게시물 추가 / 여기서 post는 데이터베이스에 추가될 데이터를 담고 있는 자바스크립트 객체의 이름 / .insert대신 비교하고 업데이트와 추가 둘 중 하나를 실행하는 .upsert도 있지만 게시글 추가는 말 그대로 "추가"를 하는 기능이라 보고 .insert를 사용했다.
  if (upsertError) {
    console.log("게시글 추가 중 에러 발생 => ", upsertError);
    return; // return을 사용하여 에러 발생 시 함수를 종료시킨다.
  }
};
