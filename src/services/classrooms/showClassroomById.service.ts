import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import ClassroomRepository from "../../repositories/ClassroomRepository";
import CourseRepository from "../../repositories/CourseRepository";
import WorkspaceRepository from "../../repositories/WorkspaceRepository";

async function showClassroomServiceById(workspace_name: string, course_id: string , class_id: string) {
  const selectedWorkspace = await WorkspaceRepository.repo().findOneBy({
    name: workspace_name,
  });

  if (!selectedWorkspace) {
    throw new AppError("Workspace not found", 404);
  }

  //const selectedCourse = await CourseRepository.repo().findOneBy({id:selectedWorkspace.id});

  const selectedsClassrooms = await ClassroomRepository.repo().findBy({
    id: class_id,
  });

  if (!selectedsClassrooms) {
    throw new AppError("Classroom not found", 404);
  }

  return selectedsClassrooms;
}

export default showClassroomServiceById;
