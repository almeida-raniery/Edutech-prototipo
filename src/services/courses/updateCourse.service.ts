import CourseRepository from "../../repositories/CourseRepository"
import {AppError} from "../../errors/AppError"

async function updateCourseService(id:string , title:string ) {

    const course = await CourseRepository.repo().findOneBy({ id: id });

    if (!course) {
        throw new AppError('Course not found', 404)
    }

    await CourseRepository.repo().update(id, {title})

    const courseUpdate = await CourseRepository.repo().findOneBy({ id: id });

    return courseUpdate

}

export default updateCourseService;