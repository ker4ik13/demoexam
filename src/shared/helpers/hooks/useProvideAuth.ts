import { AuthService, UserService } from "@/services/admin";
import type { CreateUserDto, LoginUser, User } from "@/shared/types/user";
import { useState } from "react";
import { AuthContextType } from "../auth/AuthContext";

export const useProvideAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUser = (user: User | null) => {
    if (user) {
      setIsLoading(false);
      setUser(user);
      user.isAuth ? setIsAuth(true) : setIsAuth(false);
      return user;
    } else {
      setIsLoading(false);
      setUser(null);
      setIsAuth(false);
      return null;
    }
  };

  const signin = (user: LoginUser) => {
    setIsLoading(true);
    const response = AuthService.login(user);
    return handleUser(response);
  };

  const signout = () => {
    const newUser = AuthService.logout(user);
    setIsAuth(newUser?.isAuth || false);
    return handleUser(newUser);
  };

  const registration = (user: CreateUserDto) => {
    const newUser = AuthService.registration(user);
    handleUser(newUser as User);
    return newUser as User;
  };

  const getUser = () => {
    setIsLoading(true);

    if (!user) {
      const response = UserService.getMe();
      return handleUser(response);
    }

    setIsLoading(false);
    setIsAuth(true);
    return user;
  };

  return {
    user,
    isLoading,
    isAuth,
    signin,
    signout,
    getUser,
    registration,
  };
};
