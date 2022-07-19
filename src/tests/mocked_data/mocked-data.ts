import { v4 } from "uuid";
import AppDataSource from "../../data-source";
import { Course } from "../../entities/Course";
import { Role } from "../../entities/Role";
import { Workspace } from "../../entities/Workspace";
import ClassroomRepository from "../../repositories/ClassroomRepository";
import CourseRepository from "../../repositories/CourseRepository";
import UserRepository from "../../repositories/UserRepository";
import WorkspaceRepository from "../../repositories/WorkspaceRepository";

export async function mockWorkspace() {
  const mockedWorkspace = await WorkspaceRepository.repo().create({
    id: v4(),
    name: "Greendale",
    courses: [],
    roles: [],
    created_at: new Date(),
  });

  WorkspaceRepository.repo().save(mockedWorkspace);

  return mockedWorkspace
}

export async function mockTeacherRole(workspace: Workspace) {
  const roleRepository = await AppDataSource.getRepository(Role);

  const mockedTeacherRole = await roleRepository.create({
    id: 1,
    name: "professor",
    permissions: 5,
    workspace,
    created_at: new Date(),
  });

  roleRepository.save(mockedTeacherRole);

  return mockedTeacherRole;
}

export async function mockAdminRole(workspace: Workspace) {
  const roleRepository = await AppDataSource.getRepository(Role);
  const mockedAdminRole = await roleRepository.create({
    id: 1,
    name: "dean",
    permissions: 7,
    workspace,
    created_at: new Date(),
  });

  roleRepository.save(mockedAdminRole);

  return mockedAdminRole;
}

export async function mockStudentRole(workspace: Workspace) {
  const roleRepository = await AppDataSource.getRepository(Role);
  const mockedStudentRole = await roleRepository.create({
    id: 1,
    name: "student",
    permissions: 3,
    workspace,
    created_at: new Date(),
  });

  roleRepository.save(mockedStudentRole);

  return mockedStudentRole;
}

export async function mockCourse(workspace: Workspace) {
  const mockedCourse = await CourseRepository.repo().create({
    id: v4(),
    title: "spanish",
    classRooms: [],
    workspace,
    created_at: new Date(),
  });

  CourseRepository.repo().save(mockedCourse);

  return mockedCourse;
}

export async function mockClassroom(course: Course) {
  const mockedClassroom = await ClassroomRepository.repo().create({
    id: v4(),
    title: "2009/1",
    course,
    users: [],
    created_at: new Date(),
  });

  ClassroomRepository.repo().save(mockedClassroom);

  return mockedClassroom
}

export async function mockAdmin(role: Role) {
  const mockedAdmin = await UserRepository.repo().create({
    id: v4(),
    name: "Dean",
    email: "dean@greendale.com",
    password: "w1ng3r",
    role,
    created_at: new Date(),
    last_login: new Date(),
  });

  await UserRepository.repo().save(mockedAdmin);

  return mockedAdmin;
}

export async function mockStudent(role: Role) {
  const mockedTeacher = await UserRepository.repo().create({
    id: v4(),
    name: "Duncan",
    email: "duncan@greendale.com",
    password: "w4nk",
    role,
    created_at: new Date(),
    last_login: new Date(),
  })

  await UserRepository.repo().save(mockedTeacher);

  return mockedTeacher;
}

export async function mockTeacher(role: Role) {
  const mockedStudent = await UserRepository.repo().create({
    id: v4(),
    name: "Jeff",
    email: "hotlawyer@mail.com",
    password: "w1ng3r",
    role,
    created_at: new Date(),
    last_login: new Date(),
  })

  await UserRepository.repo().save(mockedStudent);

  return mockedStudent;
}