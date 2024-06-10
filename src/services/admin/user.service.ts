import type { User } from "@/shared/types/user";

export class UserService {
  static getMe() {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as User) : null;
  }
}
