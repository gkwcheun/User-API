import { Request, Response, NextFunction } from "express";
import { GroupAttributes } from "../../interfaces/interfaces";
import db from "../../models";
import logger from "../../services/logger";

const { Group } = db;

class GroupController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    logger.info("GET request to /groups");
    try {
      const groups: GroupAttributes[] = await Group.findAll();
      res.status(200).json(groups);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: "Something went wrong..." });
      throw new Error(`unhandledRejection in get request to /groups`);
    }
  }
  static async createGroup(req: Request, res: Response, next: NextFunction) {
    const { name, permissions } = req.body;
    logger.info(`POST request to /groups`);
    try {
      const group = await Group.create({ name, permissions });
      return res.status(200).json(group);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: "Something went wrong..." });
      throw new Error(`unhandledRejection in post request to /groups`);
    }
  }
  static async getByID(req: Request, res: Response, next: NextFunction) {
    const { groupID } = req.params;
    logger.info(`GET request to /groups/${groupID}`);
    try {
      const group = await Group.findOne({ where: { id: groupID } });
      return res.status(200).json(group);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: "Something went wrong..." });
      throw new Error(
        `unhandledRejection in post request to /groups/${groupID}`
      );
    }
  }
  static async deleteGroup(req: Request, res: Response, next: NextFunction) {
    const { groupID } = req.params;
    try {
      logger.info(`DELETE request to /groups/${groupID}`);
      const group = await Group.findOne({ where: { id: groupID } });
      await group.destroy();
      res.status(200).json({ message: "Group deleted" });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: "Something went wrong..." });
      throw new Error(
        `unhandledRejection in delete request to /groups/${groupID}`
      );
    }
  }
  static async updateGroup(req: Request, res: Response, next: NextFunction) {
    const { groupID } = req.params;
    const { name, permissions } = req.body;
    try {
      logger.info(`PUT request to /groups/${groupID}`);
      const group = await Group.findOne({ where: { id: groupID } });
      group.name = name || group.name;
      group.permissions = permissions || group.permissions;
      await group.save();
      res.status(200).json(group);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: "Something went wrong..." });
      throw new Error(
        `unhandledRejection in put request to /groups/${groupID}`
      );
    }
  }
}

export default GroupController;
