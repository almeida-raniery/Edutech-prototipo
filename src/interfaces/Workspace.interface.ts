import { Course } from "../entities/Course";
import { Role } from "../entities/Role";

export interface IWorkspaceRequest {
  name: string;
  courses?: Course[];
  roles?: Role[];
}

export interface IworkspaceCreate {
  name: string;
}

export interface IWorkspace extends IWorkspaceRequest {
  readonly id: string;
  created_at: Date;
}
