import { hash } from "bcrypt";
import UserRepository from "../../repositories/UserRepository";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../../interfaces/User.interface";
import AppDataSource from "../../data-source";
import { User } from "../../entities/User";

async function createUserService(
  name: string,
  email: string,
  password: string
): Promise<IUser> {

  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      email: email,
    },
  });
  
  if (findUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hash(password, 12);

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    created_at: new Date(),
    last_login: new Date()
  };

  console.log(newUser);

  await UserRepository.create(newUser);

  await userRepository.save(newUser);

  return newUser;
}

export default createUserService;
