import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Role } from "../../entities/Role";
import { AppError } from "../../errors/AppError";
import UserRepository from "../../repositories/UserRepository";

async function VerifyTokenId(req: Request, res: Response, next: NextFunction) {
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

  next();
}

export default VerifyTokenId;