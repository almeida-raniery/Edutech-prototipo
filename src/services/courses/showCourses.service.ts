import { AppError } from "../../errors/AppError";
import CourseRepository from "../../repositories/CourseRepository";
import { Workspace } from '../../entities/Workspace';

async function showCoursesService(workspace_name:string) {

    const SelectWorkspace = await CourseRepository.repo().findBy({workspace:{name:workspace_name}});

    console.log(SelectWorkspace)

    if(!SelectWorkspace){
        throw new AppError("Workspace not found", 404);
    }

    const courses = SelectWorkspace
 
 
    return courses


}

export default showCoursesService;