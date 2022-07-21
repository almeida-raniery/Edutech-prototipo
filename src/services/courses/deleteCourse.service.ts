import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import CourseRepository from "../../repositories/CourseRepository";

async function deleteCourseService(id: string ) {

    const courseExists = await CourseRepository.repo().findOneBy({id: id });

    if(!courseExists){
        throw new AppError("Course not found", 404);
    }
  
   await CourseRepository.delete(id);

}

export default deleteCourseService;