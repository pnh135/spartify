import { Session, User, WeakPassword } from "@supabase/supabase-js";

export type AuthCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = AuthCredentials & {
  nickName: string;
};

export type AuthResponse = {
  user: User;
  session: Session;
  weakPassword?: WeakPassword;
};

export type OAuthResponse = {
  url: string;
};
