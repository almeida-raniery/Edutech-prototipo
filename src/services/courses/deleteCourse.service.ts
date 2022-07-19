import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import CourseRepository from "../../repositories/CourseRepository";

async function deleteCourseService(id: string, workspace_name:string ) {

    const courseExists = await CourseRepository.repo().findOneBy({id: id, workspace: {name:workspace_name} });

    if(!courseExists){
        throw new AppError("Course not found", 404);
    }
  
   const courseDeleted = await CourseRepository.delete(id);
  
    return courseDeleted;



}

export default deleteCourseService;