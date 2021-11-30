import { Request, Response, NextFunction } from "express";
import db from "../../models/index";
import logger from "../../services/logger";
const { sequelize, User, Group } = db;

class UserGroupController {
  static async addUserToGroup(req: Request, res: Response, next: NextFunction) {
    const { groupId, userIds } = req.body;
    logger.info(
      `addUserToGroup method called with ${groupId} and users (${userIds})`
    );
    const t = await sequelize.transaction();
    try {
      let users = [];
      for (let i = 0; i < userIds.length; i++) {
        const user = await User.findOne(
          { where: { id: userIds[i] } },
          { transaction: t }
        );
        users.push(user);
      }
      const group = await Group.findOne(
        { where: { id: groupId } },
        { transaction: t }
      );
      for (let i = 0; i < users.length; i++) {
        console.log(`Adding user with userId ${users[i].id}`);
        await group.addUser(users[i], { transaction: t });
      }
      await t.commit();
      const result = await Group.findOne(
        {
          where: { id: groupId },
          include: User,
        },
        { transaction: t }
      );
      res.status(200).json(result);
    } catch (err) {
      await t.rollback();
      logger.error(err);
      res.status(500).json({ error: "Something went wrong..." });
      throw new Error(`unhandledRejection in post request to /usergroups`);
    }
  }
}

export default UserGroupController;
