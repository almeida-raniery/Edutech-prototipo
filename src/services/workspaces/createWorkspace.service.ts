import AppDataSource from "../../data-source";
import { Workspace } from "../../entities/Workspace";
import {
  IWorkspace,
  IworkspaceCreate,
  IWorkspaceRequest,
} from "../../interfaces/Workspace.interface";
import WorkspaceRepository from "../../repositories/WorkspaceRepository";
import { Course } from "../../entities/Course";
import { Role } from "../../entities/Role";
import { User } from "../../entities/User";

async function createWorkspaceService({ name }: IworkspaceCreate) {
  const names = await WorkspaceRepository.repo().find();
  const nameAlreadyExists = names.find((nome) => nome.name === name);

  const roleRepository = AppDataSource.getRepository(Role);
  const userRepository = AppDataSource.getRepository(User);

  if (nameAlreadyExists) {
    throw new Error(`Name ${name} already exists`);
  }
  const date = new Date();
  const workspace = new Workspace();
  workspace.name = name;
  workspace.created_at = new Date();

  await WorkspaceRepository.create(workspace);
  await WorkspaceRepository.save(workspace);

  const newUser = new User();
  newUser.name = "Admin";
  newUser.email = "admin@example.com";
  newUser.password = "password@example.com";
  newUser.created_at = new Date();
  newUser.last_login = new Date();

  userRepository.create(newUser);
  await userRepository.save(newUser);

  const role = new Role();
  role.name = `Administrator ${+ date}`;
  role.permissions = 7;
  role.created_at = new Date();
  role.users = [];
  role.users.push(newUser);
  role.workspace = workspace;

  roleRepository.create(role);
  await roleRepository.save(role);

  return { message: "Successfully created", user: newUser };
}

export default createWorkspaceService;
