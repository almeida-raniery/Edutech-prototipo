import { hash } from "bcrypt";
import UserRepository from "../../repositories/UserRepository";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../../interfaces/User.interface";
import { AppError } from "../../errors/AppError";

async function createUserService(
  name: string,
  email: string,
  password: string, 
  workspace_name:string 
): Promise<IUser>{
 
  const findUser = await UserRepository.repo().findOneBy({email: email, role: { workspace: { name: workspace_name } }});

  if (findUser) {
    throw new AppError("Email already exists", 400);
  }

  const hashedPassword = await hash(password, 12);

  const newUser : IUser = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    created_at: new Date(),
    last_login: new Date(),
  };

  await UserRepository.create(newUser);

  await UserRepository.save(newUser);

  const user = {... newUser};

  return newUser;
}

export default createUserService;
