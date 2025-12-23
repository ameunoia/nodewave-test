import { verifyToken } from "$utils/jwt";
import { response_unauthorized } from "$utils/response.utils";
import { NextFunction, Request, Response } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return response_unauthorized(res, "Unauthorized");
  }

  const [, token] = authHeader.split(" ");

  try {
    verifyToken(token);
    next();
  } catch (error) {
    return response_unauthorized(res, "Invalid Token");
  }
}
