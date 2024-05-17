// const ErrorHandler = require("../utils/errorHandler");
// const catchAsyncErrors = require("./catchAsyncErrors");
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export interface CustomRequest extends Request {
  userId?: string;
}

export async function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "Please log in to access." });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(403)
            .json({ msg: "Token has expired. Please log in again to access." });
        } else {
          return res.status(403).json({ msg: err.message });
        }
      }
      const decodedPayload = decoded as JwtPayload;

      if (decodedPayload && decodedPayload.userId) {
        req.headers.userId = decodedPayload.userId;
      }
      // Call the next middleware function
      next();
    });
  } catch (err) {
    return res.status(403).json({});
  }
}

//   const authorizeRole = (...roles) => {
//     return (req, res, next) => {
//         if(!roles.includes(req.user.role)){
//             return next( new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
//         }
//         next();

//     };

// };
