import AppDataSource from "../../data-source";
import { Role } from "../../entities/Role";
import { User } from "../../entities/User";
import { Workspace } from "../../entities/Workspace";
import { INewRole } from "../Role.interface";

class WorkspaceRole implements INewRole {
  name: string;
  permissions: number;
  workspace: Workspace;
  users: User[];
  constructor({name, workspace, permissions, users}: INewRole) {
    this.name = name;
    this.workspace = workspace;
    this.permissions = permissions;
    this.users = users || []
  }

  async insert() {
    return await AppDataSource.getRepository(Role).insert(this)
  }
}

export default WorkspaceRole;