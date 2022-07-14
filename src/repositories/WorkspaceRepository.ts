import AppDataSource from "../data-source";
import { Workspace } from "../entities/Workspace";
import { IWorkspaceRequest } from "../interfaces/Workspace.interface";

class WorkspaceRepository {
  static repo() {
    return AppDataSource.getRepository(Workspace);
  }

  static async create(data: IWorkspaceRequest) {
    const repository = AppDataSource.getRepository(Workspace);
    return await repository.create(data);
  }
}

export default WorkspaceRepository;