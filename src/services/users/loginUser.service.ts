import UserRepository from "../../repositories/UserRepository";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import { LoginUser } from "../../interfaces/User.interface";

async function userLoginService(dataLogin: LoginUser) {
  
  const loggedUser = await UserRepository.repo().findOneBy({ email: dataLogin.email });

  if (!loggedUser) {
    throw new AppError("Email or password is incorrect", 401);
  }

  const lastLogin = { last_login: new Date() };

  await UserRepository.update(loggedUser.id, lastLogin);

  const passwordCompare = bcrypt.compareSync(dataLogin.password, loggedUser.password);

  if (!passwordCompare) {
    throw new AppError("Email or password is incorrect", 401);
  }

  const token = jwt.sign(
    {
      id: loggedUser.id,
      email: dataLogin.email,
      //role terá que ser pego da requisição no banco, não virá no corpo
      // role: dataLogin.role.id,
    },
    "SECRET_KEY", //utilizar gerador de chave md5
    {
      expiresIn: "24h",
    }
  );

  return token;
}

export default userLoginService;
