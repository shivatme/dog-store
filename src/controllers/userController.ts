import express, { Express, NextFunction, Request, Response } from "express";
import { findExistingUser, findUser, insertUser } from "../db/users";
import zod from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

const signupBody = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

export async function registerUser(req: Request, res: Response) {
  const { success, error } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect Inputs.",
    });
  }

  const existingUser = await findExistingUser(req.body.email);
  if (existingUser) {
    return res.status(411).json({
      message: "User with this email already exists",
    });
  }

  const { firstName, lastName, email, password } = req.body;

  const user = await insertUser(firstName, lastName, email, password);

  const token = jwt.sign({ userID: user.id }, JWT_SECRET, { expiresIn: "14d" });

  res.json({
    message: "User created successfully",
    token: token,
  });
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect Inputs.",
    });
  }
  const user = await findUser(req.body.email, req.body.password);

  if (!user) {
    return res.status(411).json({
      message: "Invalid email or password",
    });
  }
  const token = jwt.sign({ userID: user.id }, JWT_SECRET, { expiresIn: "14d" });

  res.json({
    token,
    msg: "Login successful!",
  });
}
