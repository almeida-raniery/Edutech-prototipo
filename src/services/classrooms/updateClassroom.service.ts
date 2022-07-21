import RolesRepository from "../../repositories/RolesRepository";
import ClassesRepository from "../../repositories/ClassroomRepository";
import WorkspacesRepository from "../../repositories/WorkspaceRepository";
import { AppError } from "../../errors/AppError";

async function updateClassroomService(
  workspaceName: string,
  courseId: string,
  classId: string,
  role: number,
  title: string
) {
  const roles = await RolesRepository.repo().findOneBy({ id: role });
  const workspaceFromRoleId = roles?.workspace.id;
  
  
 
  if (roles!?.permissions < 5) {
    throw new AppError("User do not have permission", 401);
  }

  const workspace = await WorkspacesRepository.repo().findOneBy({
    name: workspaceName,
  });
  const workspaceId = workspace!.id;

  if (workspaceFromRoleId !== workspaceId) {
    throw new AppError("User do not have permission", 401);
  } 

  await ClassesRepository.update(classId, { title });

  return{"title":title}
}

export default updateClassroomService;
