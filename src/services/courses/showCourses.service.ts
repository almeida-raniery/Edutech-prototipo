import { AppError } from "../../errors/AppError";
import CourseRepository from "../../repositories/CourseRepository";
import WorkspaceRepository from "../../repositories/WorkspaceRepository";

async function showCoursesService(workspace_name:string) {

    const SelectWorkspace = await WorkspaceRepository.repo().findOneBy({name: workspace_name });

    if(!SelectWorkspace){
        throw new AppError("Workspace not found", 404);
    }
  
    const courses = SelectWorkspace.courses
  
    return courses;

}

export default showCoursesService;