import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Role } from "../../entities/Role";
import { AppError } from "../../errors/AppError";
import UserRepository from "../../repositories/UserRepository";

async function VerifyTokenId(req: Request, res: Response, next: NextFunction) {
  
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

  next();
}

export default VerifyTokenId;
