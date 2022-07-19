import { AppError } from "../../errors/AppError";
import UserRepository from "../../repositories/UserRepository";

async function updateUserService(id: string, objectUser: any, workspace_name:string ) {
  
  const user = await UserRepository.repo().findOneBy({ id: objectUser.id, role: { workspace: { name: workspace_name } } });

  if (!user) {
    throw new AppError("User not found", 401);
  }

  await UserRepository.update(id, { ...objectUser });

  return "user updated";
}

export default updateUserService;
