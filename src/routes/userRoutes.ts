import express, { Express, Request, Response } from "express";
import {
  loginUser,
  registerUser,
  getUserDetails,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/logout", loginUser);

router.use(authMiddleware);
router.get("/me", getUserDetails);
router.get("/a");

export default router;
