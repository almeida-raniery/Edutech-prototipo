import { hash } from "bcrypt";
import UserRepository from "../../repositories/UserRepository";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../../interfaces/User.interface";
import { AppError } from "../../errors/AppError";
import { Role } from "../../entities/Role";
import { Classroom } from "../../entities/ClassRoom";

async function createUserService(
  name: string,
  email: string,
  password: string,
  workspace_name?: string, //verificar se o a informação virá como parâmetro
  classroom?: Classroom, //verificar se o a informação virá como parâmetro
  Role?: Role
): Promise<IUser> {
  
  const findUser = await UserRepository.repo().findOneBy({
    email: email,
    role: { workspace: { name: workspace_name } },
  });

  if (findUser) {
    throw new AppError("Email already exists", 400);
  }

  const hashedPassword = await hash(password, 12);
  
  const newUser: IUser = {
    id: uuidv4(),
    name,
    email,
    classroom: classroom,
    role: Role, //confirmar se o Role virá no corpo da requisição realizada pelo administrator
    password: hashedPassword,
    created_at: new Date(),
    last_login: new Date(),
  };

  await UserRepository.create(newUser);

  await UserRepository.save(newUser);

  return newUser;
}

export default createUserService;
