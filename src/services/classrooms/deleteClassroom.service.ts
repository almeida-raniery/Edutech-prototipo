import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import ClassroomRepository from "../../repositories/ClassroomRepository";

async function deleteClassroomService(id: string) {

    const classroomExists = await ClassroomRepository.repo().findOneBy({id: id });

    if(!classroomExists){
        throw new AppError("Classroom not found", 404);
    }
  
   const classroomDeleted = await ClassroomRepository.delete(id);
  
    return classroomDeleted;


}

export default deleteClassroomService;