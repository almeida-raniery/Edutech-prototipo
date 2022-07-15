import { hash } from "bcrypt";
import { Classroom } from "../../entities/ClassRoom";
import { v4 as uuidv4 } from "uuid";
import UserRepository from "../../repositories/UserRepository";
import { IUser, IUserRequest } from "../../interfaces/User.interface";
import { Role } from "../../entities/Role";
import ClassroomRepository from "../../repositories/ClassroomRepository";

async function createUserService(
  name: string,
  email: string,
  password: string,
  role?: string
) {
  console.log(name, email, password);

  const hashedPassword = await hash(password, 12);

  const newUser: IUserRequest = {
    name,
    email,
    password: hashedPassword
    // id: uuidv4(),
    // created_at: new Date(),
    // last_login: new Date(),
  };

  console.log(newUser);

//   const findUser = await UserRepository.save(newUser);

  console.log("Depois do find")

//   if (findUser) {
//     throw new Error("Email already exists");
//   }

  if (!newUser) {
    throw new Error("sem corpo");
  }
  console.log(newUser);

  return newUser;
}

export default createUserService;
