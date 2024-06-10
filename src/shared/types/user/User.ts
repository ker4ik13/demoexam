export interface User {
  id: string;
  user_id: string;
  email: string;
  password: string;
  firstname: string;
  lastname?: string;
  address?: string;
  phone?: string;
  isAdmin?: boolean;
  created_at?: string;
  isAuth?: boolean;
}
