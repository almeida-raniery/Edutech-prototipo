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

  const roleAdmin = new Role();
  roleAdmin.name = `Administrator`;
  roleAdmin.permissions = 7;
  roleAdmin.created_at = new Date();
  roleAdmin.users = [];
  roleAdmin.users.push(newUser);
  roleAdmin.workspace = workspace;

  roleRepository.create(roleAdmin);
  await roleRepository.save(roleAdmin);

  const roleTeacher = new Role();
  roleTeacher.name = `Teacher`;
  roleTeacher.permissions = 5;
  roleTeacher.created_at = new Date();
  roleTeacher.workspace = workspace;

  roleRepository.create(roleTeacher);
  await roleRepository.save(roleTeacher);

  const roleStudent = new Role();
  roleStudent.name = `Student`;
  roleStudent.permissions = 3;
  roleStudent.created_at = new Date();
  roleStudent.workspace = workspace;

  roleRepository.create(roleStudent);
  await roleRepository.save(roleStudent);

  return { message: "Successfully created", user: newUser,roleAdm: roleAdmin, roleS: roleStudent, roleT: roleTeacher };
}

export default createWorkspaceService;
