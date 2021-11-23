import express from "express";
import passport from "passport";
import AuthController from "./controllers/AuthController";
const authRouter = express.Router();

authRouter.post("/login", AuthController.login, (req, res) => {
  const token = req.token && req.token;
  res.json({ token });
});

authRouter.post(
  "/passport-login",
  passport.authenticate("local"),
  AuthController.passportLogin,
  (req, res) => {
    const token = req.token && req.token;
    res.json({ token });
  }
);

export default authRouter;
