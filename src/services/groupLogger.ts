import { Request, Response, NextFunction } from "express";
const groupLogger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, body } = req;
  const { groupID } = req.params;
  switch (method) {
    case "GET":
      if (groupID) {
        console.log(
          `${method} request called at ${url} called with group with id of ${groupID}`
        );
      } else {
        console.log(`${method} request called at ${url}`);
      }
      break;
    case "POST":
      if (body.name && body.permissions) {
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
      if (groupID) {
        console.log(
          `${method} request called at ${url} called with group id of ${groupID}`
        );
      } else {
        console.log(
          `${method} request needs to be called with uuid url parameter`
        );
      }
      break;
    case "PUT":
      if (groupID) {
        console.log(
          `${method} request called at ${url} for group with id of ${groupID} body of ${JSON.stringify(
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

export default groupLogger;
