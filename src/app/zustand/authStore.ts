// src/stores/authStore.ts
import { create } from "zustand";

// 로그인 상태를 관리하는 타입 정의
interface AuthState {
  user: { name: string; email: string } | null; // 유저 정보 (로그인되지 않은 경우 null)
  isAuthenticated: boolean; // 로그인 여부
  login: (userData: { name: string; email: string }) => void; // 로그인 함수
  logout: () => void; // 로그아웃 함수
}

// Zustand 스토어 생성
const useAuthStore = create<AuthState>((set) => ({
  user: null, // 초기값은 로그인되지 않은 상태
  isAuthenticated: false, // 초기값은 로그인되지 않은 상태
  login: (userData) => set({ user: userData, isAuthenticated: true }), // 로그인 처리
  logout: () => set({ user: null, isAuthenticated: false }), // 로그아웃 처리
}));

export default useAuthStore;


useAuthListener, session, event, 