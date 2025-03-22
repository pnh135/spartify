import { Session, User, WeakPassword } from "@supabase/supabase-js";

export type AuthCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = AuthCredentials & {
  nickName: string;
};

export type AuthResponse = {
  user: User | null;
  session: Session | null;
  weakPassword?: WeakPassword;
};

export type Provider = "google" | "spotify" | string;

export type OAuthResponse = {
  provider: Provider;
  url: string;
};
