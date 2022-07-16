import UserRepository from "../../repositories/UserRepository";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function userLoginService(object: any) {
  const user = await UserRepository.repo().findOneBy({ email: object.email });

  if (!user) {
    return "user not found";
  }

  const lastLogin = {last_login: new Date()};

  await UserRepository.update(user.id, lastLogin);
  

  const passwordCompare = bcrypt.compareSync(object.password, user.password);

  if (!passwordCompare) {
    return "Email or password is incorrect";
  }

  const token = jwt.sign({ 
    id: user.id,
    email: object.email
     }
    , "SECRET_KEY", {
    //utilizar gerador de chave md5
    expiresIn: "24h",
  });

  return token;
}

export default userLoginService;
