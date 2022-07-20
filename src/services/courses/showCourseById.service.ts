import { AppError } from "../../errors/AppError";
import CourseRepository from "../../repositories/CourseRepository";

async function showCoursesService(id:string) {

    const Course = await CourseRepository.repo().findOneBy({id: id});

    if(!Course){
        throw new AppError("Course not found", 404);
    }

    return Course;

}

export default showCoursesService;