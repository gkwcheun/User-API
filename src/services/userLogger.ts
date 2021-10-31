import { Request, Response, NextFunction } from "express";

const userLogger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, body } = req;
  const { uuid } = req.params;
  switch (method) {
    case "GET":
      if (uuid) {
        console.log(
          `${method} request called at ${url} called with user uuid of ${uuid}`
        );
      } else {
        console.log(`${method} request called at ${url}`);
      }
      break;
    case "POST":
      if (body.login && body.password && body.age) {
        console.log(
          `${method} request called at ${url} with body of ${JSON.stringify(
            body
          )}`
        );
      } else {
        console.log(`${method} request called with invalid body`);
      }
      break;
    case "DELETE":
      if (uuid) {
        console.log(
          `${method} request called at ${url} called with user uuid of ${uuid}`
        );
      } else {
        console.log(
          `${method} request needs to be called with uuid url parameter`
        );
      }
      break;
    case "PUT":
      if (uuid) {
        console.log(
          `${method} request called at ${url} for user with uuid ${uuid} body of ${JSON.stringify(
            body
          )}`
        );
      } else {
        console.log(
          `${method} request needs to be called with uuid url parameter`
        );
      }
      break;
    default:
      console.log("Unknown method called to API");
  }

  next();
};

export default userLogger;
