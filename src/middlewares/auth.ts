// const ErrorHandler = require("../utils/errorHandler");
// const catchAsyncErrors = require("./catchAsyncErrors");
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    if (decoded.userId) {
      req.userId = decoded.userId;

      next();
    }
  } catch (err) {
    return res.status(403).json({});
  }
};

//   const authorizeRole = (...roles) => {
//     return (req, res, next) => {
//         if(!roles.includes(req.user.role)){
//             return next( new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
//         }
//         next();

//     };

// };
