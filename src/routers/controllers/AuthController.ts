import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import db from "../../models";
import jwt from "jsonwebtoken";

dotenv.config();

const { User } = db;

declare global {
  namespace Express {
    export interface Request {
      token?: string;
      verifiedUser?: any;
      body?: {
        login?: string;
        password?: string;
      };
    }
  }
}

async function validateCredentials(login: string, password: string) {
  const user = await User.findOne({ where: { login: login } });
  if (user) {
    if (user.password === password) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    const { login, password } = req.body;
    const user = await validateCredentials(login, password);
    if (user) {
      const token = jwt.sign(
        user.dataValues,
        process.env.ACCESS_TOKEN_SECRET as string
      );
      req.token = token;
    }
    next();
  }
  static passportLogin(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    if (user) {
      const token = jwt.sign(
        user.dataValues,
        process.env.ACCESS_TOKEN_SECRET as string
      );
      req.token = token;
    }
    next();
  }
  static authenticateJwt(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.sendStatus(401);
    }
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, user) => {
        if (err) return res.sendStatus(403);
        req.verifiedUser = user;
        next();
      }
    );
  }
}

export default AuthController;
