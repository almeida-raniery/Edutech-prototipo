import AppDataSource from "../../data-source";
import { Role } from "../../entities/Role";
import { AppError } from "../../errors/AppError";
import { INewRole } from "../../interfaces/Role.interface";
import ClassroomRepository from "../../repositories/ClassroomRepository";
import RolesRepository from "../../repositories/RolesRepository";
import UserRepository from "../../repositories/UserRepository";
import { hash } from "bcrypt";
import { SimpleConsoleLogger } from "typeorm";

async function updateUserService(
  id: string,
  userDataUpdate: any,
  userRole: number
) {
 
  let user = await UserRepository.repo().findOneBy({ id });

  if (!user) {
    throw new AppError("User not found", 401);
  }

  const roledUser = await RolesRepository.repo().findOneBy({ id: userRole });

  let array = Object.keys(userDataUpdate);

  const modifyName = array.includes("name");
  const modifyEmail = array.includes("email");
  const modifyPassword = array.includes("password");
  const modifyClassroom = array.includes("classroom");
  const modifyRole = array.includes("role");
  const modifyCreate_at = array.includes("created_at");
  const modifyLastLogin = array.includes("last_login");

  if(modifyCreate_at || modifyLastLogin){
    throw new AppError("User not authorized", 401);
  }

  if (roledUser?.permissions === 7) {
    if (modifyPassword || modifyName) {
      throw new AppError("User not authorized", 401);
    }
  }

  if (roledUser?.permissions !== 7) {
    if (modifyEmail || modifyRole || modifyClassroom) {
      throw new AppError("User not authorized", 401);
    }
  }

  await UserRepository.update(id, { ...userDataUpdate });

  return userDataUpdate;
}
export default updateUserService;
