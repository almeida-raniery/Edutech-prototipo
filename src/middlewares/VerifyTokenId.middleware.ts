import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function VerifyTokenId(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const tokenSplit = token.split(" ");

  jwt.verify(tokenSplit[1], "SECRET_KEY", (error: any, decoded: any) => {
    if (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    if(req.params.id !== decoded.id){
        return res.status(401).json({
            message: "User Invalid token 3",
          });
    }
    next();
  });
}

export default VerifyTokenId;