import RolesRepository from "../../repositories/RolesRepository";
import CoursesRepository from "../../repositories/CourseRepository"
import ClassesRepository from "../../repositories/ClassroomRepository"
import WorkspacesRepository from "../../repositories/WorkspaceRepository"

async function updateClassroomService(workspaceName: string, courseId: string, classId:string, role:number) {
    const roles = await RolesRepository.repo().findOneBy({id: role})
    
    const workspace = await WorkspacesRepository.repo().findOneBy({name: workspaceName})
    const workspaceId = workspace!.id
    

}

export default updateClassroomService;