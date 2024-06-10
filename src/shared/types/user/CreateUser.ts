export interface CreateUserDto {
  email: string;
  isAdmin?: boolean;
  firstname: string;
  lastname: string;
  password: string;
  isAuth?: boolean;
}
