import { createClient } from "@supabase/supabase-js";

// 임시로 내가 만든 supabase 사용 상수?
const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!SUPABASE_PROJECT_URL) {
  throw new Error(
    "환경 변수 `NEXT_PUBLIC_SUPABASE_URL`이 설정되지 않았습니다!",
  );
}
if (!SUPABASE_ANON_KEY) {
  throw new Error(
    "환경 변수 `NEXT_PUBLIC_SUPABASE_ANON_KEY`이 설정되지 않았습니다!",
  );
}

export const supabase = createClient(SUPABASE_PROJECT_URL!, SUPABASE_ANON_KEY!);
