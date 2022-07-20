import CourseRepository from "../../repositories/CourseRepository"
import {AppError} from "../../errors/AppError"

async function updateCourseService(id:string , title:string ) {

    const courseUpdate = await CourseRepository.repo().findOneBy({ id: id });

    if (!courseUpdate) {
        throw new AppError('Course is not found', 404)
    }

    courseUpdate.title = title

    await CourseRepository.repo().update(id, {title})

    return courseUpdate

}

export default updateCourseService;