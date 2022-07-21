import { hash } from "bcrypt";
import UserRepository from "../../repositories/UserRepository";
import { v4 as uuidv4 } from "uuid";
import { IUser, UserToBeReturned} from "../../interfaces/User.interface";
import { AppError } from "../../errors/AppError";
import RolesRepository from "../../repositories/RolesRepository";
import ClassroomRepository from "../../repositories/ClassroomRepository";

async function createUserService(
  name: string,
  email: string,
  password: string,
  classroom_id: string, 
  role_id: number,
  workspace_name: string
): Promise<IUser> {

  const findUser = await UserRepository.repo().findOneBy({
    email: email,
    role: { workspace: { name: workspace_name } },
  });

  if (findUser) {
    throw new AppError("Email already exists", 404);
  }

  const hashedPassword = await hash(password, 12);

  const newUser: IUser = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    created_at: new Date(),
    last_login: new Date(),
  };
  
  const userRole = await RolesRepository.repo().findOneBy({ id: role_id });

  if (userRole) {
    newUser.role = userRole;
  }

  const userClassroom = await ClassroomRepository.repo().findOneBy({ id: classroom_id });

  if(userClassroom){
    newUser.classroom = userClassroom;
  }
  
  await UserRepository.create(newUser);
  await UserRepository.save(newUser);
  
  return newUser;
}

export default createUserService;
