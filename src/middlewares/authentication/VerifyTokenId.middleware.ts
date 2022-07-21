import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Role } from "../../entities/Role";
import { AppError } from "../../errors/AppError";
import UserRepository from "../../repositories/UserRepository";

async function VerifyTokenId(req: Request, res: Response, next: NextFunction) {
<<<<<<< HEAD
  const splitBaseUrl   = req.baseUrl.split("/") 
  const roleRepository = AppDataSource.getRepository(Role);
  const userRole = await roleRepository.findOneBy({
    id: req.user.role,
    workspace: { name: splitBaseUrl[1] },
  });
  const user = await UserRepository.repo().findOneBy({id: req.user.id})
  const isSameUser = user?.classroom?.id === req.params.id

  if (!userRole || !isSameUser || userRole.permissions < 7) {
    throw new AppError("Unauthorized access", 401);
  }

=======
  
  console.log(req)
  const roleRepository = AppDataSource.getRepository(Role);
  const userRole = await roleRepository.findOneBy({ id: req.user.role });
  
  console.log(userRole);

  if (userRole?.permissions === 7) {
    next();
  }

  let user = await UserRepository.repo().findOneBy({ id: req.user.id });
  if (!user) {
    throw new AppError("User not authorizated");
  }

>>>>>>> 6e9d636f1796ac47a1e37a2103a6bb4389479979
  next();
}

export default VerifyTokenId;
