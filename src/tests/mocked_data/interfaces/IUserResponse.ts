export interface IUserResponse{
  id: string;
  name: string;
  email: string;
  password?: string;
  role_id?: number;
  class_id?: string;
  created_at: string;
  last_login: string;
}