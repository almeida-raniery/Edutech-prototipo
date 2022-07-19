import CourseRepository from "../../repositories/CourseRepository"
import WorkspaceRepository from "../../repositories/WorkspaceRepository";
import { Course } from "../../entities/Course";
import { v4 as uuidv4 } from "uuid";
import {AppError} from "../../errors/AppError"

async function createCourseService(title: string, workspaceName: string) {

    const foundCourse = await CourseRepository.repo().findOneBy({ title: title });

    if (foundCourse) {
        throw new AppError('Course already exists', 400)
    }

    const foundWorkspace = await WorkspaceRepository.repo().findOneBy({ name: workspaceName })

    const course = new Course()
    course.id = uuidv4()
    course.title = title
    course.created_at = new Date()
    course.workspace = foundWorkspace!

    await CourseRepository.repo().create(course)
    await CourseRepository.repo().save(course)

}

export default createCourseService;