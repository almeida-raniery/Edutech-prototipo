import UserRepository from "../../repositories/UserRepository";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";

async function userLoginService(object: any) {
  const user = await UserRepository.repo().findOneBy({ email: object.email });

  if (!user) {
    throw new AppError("Email or password is incorrect", 401);
  }

  const lastLogin = { last_login: new Date() };

  await UserRepository.update(user.id, lastLogin);

  const passwordCompare = bcrypt.compareSync(object.password, user.password);

  if (!passwordCompare) {
    throw new AppError("Email or password is incorrect", 401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: object.email,
      //role terá que ser pego da requisição no banco, não virá no corpo
      role: user.role?.id
    },
    "SECRET_KEY", //utilizar gerador de chave md5
    {
      expiresIn: "24h",
    }
  );

  return token;
}

export default userLoginService;
