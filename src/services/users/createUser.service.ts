import { hash } from "bcrypt";
import UserRepository from "../../repositories/UserRepository";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../../interfaces/User.interface";

async function createUserService(
  name: string,
  email: string,
  password: string
): Promise<IUser>{
 
  const findUser = await UserRepository.repo().findOneBy({email: email});

  if (findUser) {
    throw new Error("Email already exists");
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

  return newUser;
}

export default createUserService;
