import { Classroom } from "../entities/ClassRoom";
import { Workspace } from "../entities/Workspace";

export interface ICourseRequest {
  title: string;
  classRooms: Classroom[];
  workspace: Workspace;
}

export interface ICourse extends ICourseRequest {
  readonly id: string;
  created_at: Date;
}
