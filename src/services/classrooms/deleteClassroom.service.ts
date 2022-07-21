import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import ClassroomRepository from "../../repositories/ClassroomRepository";

async function deleteClassroomService(id: string) {
  const classroomExists = await ClassroomRepository.repo().findOneBy({
    id: id,
  });

  if (id.length == 0) {
    throw new AppError("Invalid parameters", 400);
  }

  if (!classroomExists) {
    throw new AppError("Classroom not found", 404);
  }

  const classroomDeleted = await ClassroomRepository.delete(id);

  return { message: "Deleted class successfully" };
}

export default deleteClassroomService;
