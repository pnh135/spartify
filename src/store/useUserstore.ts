import { supabase } from "@/app/api/supabase/supabase";
import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  isLogin: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

// Supabase 구독 객체 타입 정의
interface SupabaseUnsubscribable {
  unsubscribe: () => void;
}

interface AuthListenerData {
  subscription: SupabaseUnsubscribable;
}

const useUserStore = create(
  persist<UserState>(
    set => ({
      user: null,
      isLogin: false,
      setUser: (user: User) => set({ user, isLogin: true }),
      clearUser: () => set({ user: null, isLogin: false }),
    }),
    {
      name: "user-storage",
    },
  ),
);

export const handleAuthStateChange = async (): Promise<AuthListenerData> => {
  const { setUser, clearUser } = useUserStore.getState();

  const { data: unsubscribe } = supabase.auth.onAuthStateChange(
    (event: string, session: Session | null) => {
      console.log(session);
      if (event === "SIGNED_IN" && session) {
        setUser(session.user); // 사용자 정보 저장, isLogin 을 true로 변경
      } else if (event === "SIGNED_OUT") {
        clearUser(); // 사용자 정보 null로 초기화, isLogin 을 false로 변경
      }
    },
  );

  return unsubscribe as AuthListenerData;
};

export default useUserStore;
