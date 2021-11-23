import express from "express";
import passport from "passport";
import cors from "cors";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import db from "./models";
import userRouter from "./routers/userRouter";
import groupRouter from "./routers/groupRouter";
import userGroupRouter from "./routers/userGroupRouter";
import authRouter from "./routers/authRouter";
import getUserById from "./services/getUserById";

declare global {
  namespace Express {
    interface User {
      login: string;
      password: string;
      id: string;
      dataValues: any;
    }
  }
}

const { sequelize, User } = db;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: "login" }, async function (
    username: string,
    password: string,
    done: any
  ) {
    try {
      const user = await User.findOne({ where: { login: username } });
      if (user.password === password) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id: string, done) => {
  const user = await getUserById(id);
  return done(null, user);
});

app.use("/users", userRouter);
app.use("/groups", groupRouter);
app.use("/usergroups", userGroupRouter);
app.use("/auth", authRouter);

app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
  await db.sequelize.authenticate();
  console.log("Database Connected!");
});
