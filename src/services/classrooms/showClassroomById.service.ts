import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import ClassroomRepository from "../../repositories/ClassroomRepository";
import CourseRepository from "../../repositories/CourseRepository";
import UserRepository from "../../repositories/UserRepository";
import WorkspaceRepository from "../../repositories/WorkspaceRepository";

async function showClassroomServiceById(
  workspace_name: string,
  course_id: string,
  class_id: string
) {
  const selectedWorkspace = await WorkspaceRepository.repo().findOneBy({
    name: workspace_name,
  });

  const selectedUsers = await UserRepository.repo().findBy({
    classroom:{id: class_id},
  });

  if(!workspace_name || course_id || class_id){
    throw new AppError("Invalid params", 400);
  }

  if (!selectedWorkspace) {
    throw new AppError("Workspace is not found", 404);
  }

  const selectedsClassrooms = await ClassroomRepository.repo().findBy({
    id: class_id,
  });

  if (!selectedsClassrooms) {
    throw new AppError("Class is not found", 404);
  }
  console.log(selectedsClassrooms);


  return {
    "title": selectedsClassrooms[0].title,
    "class_id":selectedsClassrooms[0].id,
    "created_at":selectedsClassrooms[0].created_at,
    "usersList":selectedUsers
  };
}

export default showClassroomServiceById;
