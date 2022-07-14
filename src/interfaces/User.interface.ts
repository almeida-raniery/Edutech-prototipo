import { Classroom } from "../entities/ClassRoom";
import { Role } from "../entities/Role";

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  classroom: Classroom;
  role: Role;
}

export interface IUser extends IUserRequest{
  readonly id: string;
  created_at: Date;
  last_login: Date;
}