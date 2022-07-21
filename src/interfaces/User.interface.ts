import { Classroom } from "../entities/ClassRoom";
import { Role } from "../entities/Role";

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  classroom?: Classroom;
  role?: Role;
}

export interface IUser extends IUserRequest {
  readonly id: string;
  created_at: Date;
  last_login: Date;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface UserToBeReturned {
  id: string,
  name: string,
  email: string,
  classroom?: Classroom;
  role?: Role;
  created_at: Date;
  last_login: Date;
}
