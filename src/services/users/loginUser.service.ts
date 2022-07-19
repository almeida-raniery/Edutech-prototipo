import UserRepository from "../../repositories/UserRepository";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import { LoginUser } from "../../interfaces/User.interface";
import WorkspaceRepository from "../../repositories/WorkspaceRepository";

async function userLoginService(dataLogin: LoginUser, workspace_name: string) {

  const loggedUser = await UserRepository.repo().findOneBy({
    email: dataLogin.email,
    role: { workspace: { name: workspace_name } },
  });

  const Workspace_Name = await WorkspaceRepository.repo().findOneBy({ name: workspace_name });
  
  console.log(loggedUser, Workspace_Name?.name, workspace_name, "aqui");

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
      email: loggedUser.email,
      // role: loggedUser.role_id,
    },
    "SECRET_KEY", //utilizar gerador de chave md5
    {
      expiresIn: "24h",
    }
  );

  return token;
}

export default userLoginService;
