import db from "../../models/index";
import { Request, Response, NextFunction } from "express";
import { UserAttributes, UserRawInterface } from "../../interfaces/interfaces";
import logger from "../../services/logger";

const { Sequelize, User } = db;

class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const { loginSubstr, limit } = req.query;
    const { like } = Sequelize.Op;
    try {
      let users: UserAttributes[] = [];
      let options = loginSubstr
        ? limit
          ? {
              limit,
              where: {
                login: {
                  [like]: `%${loginSubstr}%`,
                },
              },
            }
          : {
              where: {
                login: {
                  [like]: `%${loginSubstr}%`,
                },
              },
            }
        : {};
      let response: UserRawInterface[] = await User.findAll(options);
      response.forEach((user) => {
        users.push(user.dataValues);
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: "Something went wrong..." });
      logger.error(err);
      throw new Error("unhandledRejection in get request to /user");
    }
  }
  static async getByID(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
    logger.info(`GET request to /user/${uuid}`);
    try {
      const user = await User.findOne({ where: { id: uuid } });
      res.status(200).json(user.dataValues);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: "Something went wrong..." });
      throw new Error(`unhandledRejection in get request to /user/${uuid}`);
    }
  }
  static async createUser(req: Request, res: Response, next: NextFunction) {
    const { login, password, age } = req.body;
    const userData = { login, password, age, isDeleted: false };
    logger.info("POST request to /user");
    try {
      const user = await User.create({ ...userData });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: "Something went wrong..." });
      logger.error(err);
      throw new Error("unhandledRejection in post request to /user");
    }
  }
  static async updateUser(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
    const { login, password, age } = req.body;
    logger.info(`PUT request to /user/${uuid}`);
    try {
      const user = await User.findOne({ where: { id: uuid } });
      user.login = login || user.login;
      user.password = password || user.password;
      user.age = age || user.age;
      user.save();
      res.status(200).json(user.dataValues);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: "Something went wrong..." });
      throw new Error(`unhandledRejection in put request to /user/${uuid}`);
    }
  }
  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
    logger.info(`DELETE request to /user/${uuid}`);
    try {
      const user = await User.findOne({ where: { id: uuid } });
      await user.destroy();
      res.status(200).json({ message: "User deleted." });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ error: "Something went wrong." });
      throw new Error(`unhandledRejection in delete request to /user`);
    }
  }
  static async getUserById(id: string) {
    // for passport, get user without parsing to json
    logger.info(`Finding user by id ${id}`);
    try {
      const user = await User.findOne({ where: { id } });
      return user;
    } catch (err) {
      logger.error(err);
      throw new Error(`unhandledRejection finding user of id ${id}`);
    }
  }
}

export default UserController;
