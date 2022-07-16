import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function VerifyTokenId(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization;
    console.log(req.headers.authorization)

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const tokenSplit = token.split(" ");

  jwt.verify(tokenSplit[1], "SECRET_KEY", (error: any, decoded: any) => {
    if (error) {
      return res.status(401).json({
        message: "Invalid token 2",
      });
    }

    console.log(req.params.id)
    console.log(decoded)

    if(req.params.id !== decoded.id){

        return res.status(401).json({
            message: "User Invalid token",
          });
    }

    next();
  });
}

export default VerifyTokenId;