import { Workspace } from "../entities/Workspace";
import { ICourse } from "./Course.interface";
import { IUser } from "./User.interface";

export interface IClassroomRequest {
  title: string;
  users: IUser[];
  course: ICourse;
  // workspace: Workspace;
}

export interface IClassroom extends IClassroomRequest {
  readonly id: string;
  created_at: Date;
}