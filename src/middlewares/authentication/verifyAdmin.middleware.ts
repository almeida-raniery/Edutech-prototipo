import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Role } from "../../entities/Role";
import { AppError } from "../../errors/AppError";

async function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const splitBaseUrl   = req.baseUrl.split("/") 
  const roleRepository = AppDataSource.getRepository(Role);
  const userRole = await roleRepository.findOneBy({
    id: req.user.role,
    workspace: { name: splitBaseUrl[1] },
  });

  if (!userRole || userRole.permissions < 7) {
    throw new AppError("Unauthorized access", 401);
  }

  next();
}

export default verifyAdmin;
