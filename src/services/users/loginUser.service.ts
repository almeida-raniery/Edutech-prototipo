import UserRepository from "../../repositories/UserRepository";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function userLoginService(object: any) {
  const user = await UserRepository.repo().findOneBy({ email: object.email });

  if (!user) {
    return "user not found";
  }

  console.log("Bycrypt aqui");
  console.log(user);
  console.log(object.password);

//   As migrations estão configuradas para não permitir a leitura da senha, por isso ainda não configurei o login
//   const passwordCompare = await bcrypt.compareSync(
//     user.password,
//     object.password
//   );

//   if (!passwordCompare) {
//     return "Email or password is incorrect";
//   }

  console.log("jwt aqui");

  const token = jwt.sign({ email: object.email }, "SECRET_KEY", { //utilizar gerador de chave md5
    expiresIn: "24h"
  });

  console.log(token);

  return token;
}

export default userLoginService;
