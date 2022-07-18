import AppDataSource from "../data-source";
import { Workspace } from "../entities/Workspace";
import { IWorkspaceRequest } from "../interfaces/Workspace.interface";

class WorkspaceRepository {
  static repo() {
    return AppDataSource.getRepository(Workspace);
  }

  static async create(data: IWorkspaceRequest) {
    const repository = AppDataSource.getRepository(Workspace);
    return repository.create(data);
  }

  static async save(data: IWorkspaceRequest) {
    const repository = AppDataSource.getRepository(Workspace);
    return await repository.save(data);
  }
}

export default WorkspaceRepository;