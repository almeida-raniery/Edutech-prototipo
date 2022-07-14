import { User } from "../entities/User";
import { Workspace } from "../entities/Workspace";

export interface INewRole {
  name: string;
  users?: User[];
  workspace: Workspace;
  permissions: number;
}

export interface IRole extends INewRole {
  readonly id: number;
  created_at: Date;
}
