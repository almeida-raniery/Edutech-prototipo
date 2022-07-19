import AppDataSource from "../../data-source";
import CourseRepository from "../../repositories/CourseRepository"
import UserRepository from "../../repositories/UserRepository";
import { Role } from "../../entities/Role";

async function createCourseService(title: string, role: number) {
    
    const foundCourse = await CourseRepository.repo().findOneBy({ title: title });
    
    if (foundCourse) {
        throw new Error('Course already exists')
    }
    
    //const foundUser = await UserRepository.repo().findOneBy({id: decoded.id})
    //const role = foundUser?.role
    
    //const roleRepository = await AppDataSource.getRepository(Role);
    //const roles = await roleRepository.findOneBy({id: role})
}

export default createCourseService;