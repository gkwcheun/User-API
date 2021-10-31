import express from "express";
import groupLogger from "../services/groupLogger";
import GroupController from "./controllers/GroupController";
import AuthController from "./controllers/AuthController";

const groupRouter = express.Router();

groupRouter.get(
  "/",
  groupLogger,
  AuthController.authenticateJwt,
  GroupController.getAll
);

groupRouter.post(
  "/",
  groupLogger,
  AuthController.authenticateJwt,
  GroupController.createGroup
);

groupRouter.get(
  "/:groupID",
  groupLogger,
  AuthController.authenticateJwt,
  GroupController.getByID
);

groupRouter.delete(
  "/:groupID",
  groupLogger,
  AuthController.authenticateJwt,
  GroupController.deleteGroup
);

groupRouter.put(
  "/:groupID",
  groupLogger,
  AuthController.authenticateJwt,
  GroupController.updateGroup
);

export default groupRouter;
