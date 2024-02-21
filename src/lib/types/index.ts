import { User, NavLinkType, RegisterValue, Token } from './section';

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  picture: string | null;
}
export interface RegisterUserPayload {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  picture: string | null;
}

export interface NavbarSectionType {
  navLinks: NavLinkType[];
}

export interface RegisterSection {
  registerValue: RegisterValue[];
}

export interface AuthState {
  loading: boolean;
  userInfo: User | null;
  tokens: Token | null;
  error: string | null;
  success: boolean;
}

export interface FileState {
  loading: boolean;
  count: string | null;
  image_url: string | null;
  error: string | null;
}
export interface DemoState {
  baseImageUrl: string | null;
  resultImageUrl: string | null;
}
