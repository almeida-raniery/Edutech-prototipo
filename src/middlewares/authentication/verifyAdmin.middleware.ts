import { NextFunction, request, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Role } from "../../entities/Role";
import { AppError } from "../../errors/AppError";

async function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  
  const roleRepository = AppDataSource.getRepository(Role)
  const userRole = await roleRepository.findOneBy({id: req.user.role});
  
  if (!userRole || userRole.permissions < 7) {
    throw new AppError("User not allowed", 401)
  }

  next();
}

export default verifyAdmin;