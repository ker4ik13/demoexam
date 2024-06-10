import type { CreateUserDto, LoginUser, User } from "@/shared/types/user";
import { createContext, type ReactNode } from "react";
import { useProvideAuth } from "../hooks";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuth: boolean;
  signin: (user: LoginUser) => User | null;
  signout: () => User | null;
  getUser: () => User | null;
  registration: (user: CreateUserDto) => CreateUserDto | User;
}
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
