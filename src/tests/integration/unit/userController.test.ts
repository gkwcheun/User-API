import db from "../../../models/index";
const { sequelize, User } = db;
import UserController from "../../../routers/controllers/UserController";
import { getMockReq, getMockRes } from "@jest-mock/express";

describe("UserController getAll tests", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });
  test("getAll works without any req.query params, fetches all users", async () => {
    const req = getMockReq();
    const { res, next } = getMockRes();
    await UserController.getAll(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
  test("getAll works with params", async () => {
    const req = getMockReq({ query: { loginSubstr: "owitham0", limit: 1 } });
    const { res, next } = getMockRes();
    await UserController.getAll(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([
      {
        age: 81,
        id: "affaa081-3c29-4c9d-b302-8ecf06bc8121",
        isDeleted: false,
        login: "owitham0",
        password: "SQucXdgzJ",
      },
    ]);
  });
  test("getAll returns empty user array when querying for non existent user", async () => {
    const req = getMockReq({ query: { loginSubstr: "DOES_NOT_EXIST" } });
    const { res, next } = getMockRes();
    await UserController.getAll(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([]);
  });
});

describe("UserController getById tests", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });
  test("getByID works with a uuid in database", async () => {
    const req = getMockReq({
      params: { uuid: "e3cbf2d8-5e0d-488e-b65e-5c39bbf63d85" },
    });
    const { res, next } = getMockRes();
    await UserController.getByID(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      id: "e3cbf2d8-5e0d-488e-b65e-5c39bbf63d85",
      login: "alaurentin1",
      password: "Dzl4tFlDe",
      age: 117,
      isDeleted: true,
    });
  });
  test("getByID throws an error if no uuid param", async () => {
    const req = getMockReq();
    const { res, next } = getMockRes();
    try {
      await UserController.getByID(req, res, next);
    } catch (error) {
      expect(res.status).toBeCalledWith(500);
      expect(error).toEqual(
        new Error("unhandledRejection in get request to /user/undefined")
      );
    }
  });
  test("getByID throws an error if non existent uuid param", async () => {
    let uuid = "this_uuid_does_not_exist";
    const req = getMockReq({
      params: { uuid: uuid },
    });
    const { res, next } = getMockRes();
    try {
      await UserController.getByID(req, res, next);
    } catch (error) {
      expect(res.status).toBeCalledWith(500);
      expect(error).toEqual(
        new Error(`unhandledRejection in get request to /user/${uuid}`)
      );
    }
  });
});

describe("UserController createUser tests", () => {
  //testing create,update,delete all at once so database is unmodified
  beforeAll(async () => {
    await sequelize.authenticate();
  });
  //commented out because it will create new user everytime we run test
  // test("createUser works properly with given login, password, age in body", async () => {
  //   const req = getMockReq({
  //     body: {
  //       login: "galvin",
  //       password: "password",
  //       age: 27,
  //     },
  //   });
  //   const { res, next } = getMockRes();
  //   await UserController.createUser(req, res, next);
  //   expect(res.status).toBeCalledWith(200);
  //   expect(res.json).toBeCalledTimes(1);
  // });
  test("createUser doesn't work without having all 3 params in body", async () => {
    const req = getMockReq({
      body: {
        login: "galvin2",
        password: "1234",
        // missing age
      },
    });
    const { res, next } = getMockRes();
    try {
      await UserController.createUser(req, res, next);
    } catch (error) {
      expect(res.status).toBeCalledWith(500);
      expect(error).toEqual(
        new Error("unhandledRejection in post request to /user")
      );
    }
  });
  test("createUser doesn't work without having all 3 params in body", async () => {
    const req = getMockReq({
      body: {
        // missing login
        password: "1234",
        // missing age
      },
    });
    const { res, next } = getMockRes();
    try {
      await UserController.createUser(req, res, next);
    } catch (error) {
      expect(res.status).toBeCalledWith(500);
      expect(error).toEqual(
        new Error("unhandledRejection in post request to /user")
      );
    }
  });
  test("createUser doesn't work without having all 3 params in body", async () => {
    const req = getMockReq({
      body: {
        user: "Testing",
        // missing password
        // missing age
      },
    });
    const { res, next } = getMockRes();
    try {
      await UserController.createUser(req, res, next);
    } catch (error) {
      expect(res.status).toBeCalledWith(500);
      expect(error).toEqual(
        new Error("unhandledRejection in post request to /user")
      );
    }
  });
});

describe("UserController updateUser tests", () => {
  test("updateUser works properly when given a uuid but no body", async () => {
    let uuid = "9fbabed2-f7ff-4f09-9202-c6360b7ffc08";
    const req = getMockReq({
      params: { uuid: uuid },
    });
    const { res, next } = getMockRes();
    await UserController.updateUser(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      age: 53,
      id: "9fbabed2-f7ff-4f09-9202-c6360b7ffc08",
      isDeleted: true,
      login: "hmacclinton4",
      password: "wVKMplJc",
    });
  });
  test("updateUser correctly updates user info", async () => {
    let uuid = "b8fc9529-0ae7-4bf9-a348-a0b87e1080a9";
    let newLogin = "new_login";
    let newPassword = "password";
    let newAge = 100;
    const req = getMockReq({
      params: { uuid: uuid },
      body: {
        login: newLogin,
        password: newPassword,
        age: newAge,
      },
    });
    const { res, next } = getMockRes();
    await UserController.updateUser(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      age: newAge,
      id: "b8fc9529-0ae7-4bf9-a348-a0b87e1080a9",
      isDeleted: false,
      login: newLogin,
      password: newPassword,
    });
  });
});

describe("UserControler deleteUser tests", () => {
  //commented out because can't delete user twice, need to use different uuid
  // test("deleteUser works properly given an existing id", async () => {
  //   const req = getMockReq({
  //     params: { uuid: "7882adcc-3d8f-44dc-934c-6b29e678be72" },
  //   });
  //   const { res, next } = getMockRes();
  //   await UserController.deleteUser(req, res, next);
  //   expect(res.status).toBeCalledWith(200);
  //   expect(res.json).toBeCalledTimes(1);
  //   expect(res.json).toBeCalledWith({
  //     message: "User deleted.",
  //   });
  // });
  test("deleteUser throws an error if uuid is invalid", async () => {
    const req = getMockReq({
      params: { uuid: "INVALID_UUID" },
    });
    const { res, next } = getMockRes();
    try {
      await UserController.deleteUser(req, res, next);
    } catch (error) {
      expect(res.status).toBeCalledWith(500);
      expect(error).toEqual(
        new Error(`unhandledRejection in delete request to /user`)
      );
    }
  });
  test("deleteUser throws an error if no uuid provided", async () => {
    const req = getMockReq();
    const { res, next } = getMockRes();
    try {
      await UserController.deleteUser(req, res, next);
    } catch (error) {
      expect(res.status).toBeCalledWith(500);
      expect(error).toEqual(
        new Error(`unhandledRejection in delete request to /user`)
      );
    }
  });
});
