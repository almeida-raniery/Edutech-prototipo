import { hash } from "bcrypt";
import UserRepository from "../../repositories/UserRepository";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../entities/User";
import { IUser } from "../../interfaces/User.interface";

async function createUserService(
  name: string,
  email: string,
  password: string,
  role?: string
) {
  const hashedPassword = await hash(password, 12);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    id: uuidv4(),
    created_at: new Date(),
    last_login: new Date(),
  };

  console.log(newUser);

  let user : IUser = {

  name: name,
  email: email,
  password: hashedPassword,
  id: uuidv4(),
  created_at: new Date(),
  last_login: new Date()
}
  await UserRepository.create(user);

  //   if (findUser) {
  //     throw new Error("Email already exists");
  //   }

  return user;
}

export default createUserService;
