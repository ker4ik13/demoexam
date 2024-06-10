import type { CreateUserDto, LoginUser, User } from "@/shared/types/user";

export class AuthService {
  static login(dto: LoginUser): User | null {
    const user = localStorage.getItem("user");

    if (user) {
      const checkUser = JSON.parse(user);

      if (
        checkUser.email === dto.email &&
        checkUser.password === dto.password
      ) {
        return checkUser as User;
      }
    }
    return null;
  }

  static registration(dto: CreateUserDto) {
    localStorage.setItem("user", JSON.stringify(dto));
    return dto;
  }

  static logout(user: User | null) {
    if (user) {
      const newUser = {
        ...user,
        isAuth: false,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    }

    return user;
  }
}
