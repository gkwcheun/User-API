import express from "express";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import userLogger from "../services/userLogger";

const userRouter = express.Router();

userRouter.get(
  "/",
  userLogger,
  AuthController.authenticateJwt,
  UserController.getAll
);

userRouter.post(
  "/",
  userLogger,
  AuthController.authenticateJwt,
  UserController.createUser
);

userRouter.get(
  "/:uuid",
  userLogger,
  AuthController.authenticateJwt,
  UserController.getByID
);

userRouter.put(
  "/:uuid",
  userLogger,
  AuthController.authenticateJwt,
  UserController.updateUser
);

userRouter.delete(
  "/:uuid",
  userLogger,
  AuthController.authenticateJwt,
  UserController.deleteUser
);

export default userRouter;
