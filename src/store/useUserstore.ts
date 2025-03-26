import { supabase } from "@/app/api/supabase/supabase";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    set => ({
      user: null,
      isLogin: false,
      setUser: user => set({ user, isLogin: true }),
      clearUser: () => set({ user: null, isLogin: false }),
    }),
    {
      name: "user-storage",
    },
  ),
);

export const handleAuthStateChange = async () => {
  const { setUser, clearUser } = useUserStore.getState();

  const { data: unsubscribe } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setUser(session.user); // 사용자 정보 저장, isLogin 을 true로 변경
      } else if (event === "SIGNED_OUT") {
        clearUser(); // 사용자 정보 null로 초기화, isLogin 을 false로 변경
      }
    },
  );

  return unsubscribe;
};

export default useUserStore;
