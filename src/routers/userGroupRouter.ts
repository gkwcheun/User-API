import express from "express";
import UserGroupController from "./controllers/UserGroupController";
import AuthController from "./controllers/AuthController";

const userGroupRouter = express.Router();

userGroupRouter.post(
  "/",
  AuthController.authenticateJwt,
  UserGroupController.addUserToGroup
);

export default userGroupRouter;
