import db from "../../../models/index";
const { sequelize, Group } = db;
import GroupController from "../../../routers/controllers/GroupController";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { GroupAttributes } from "../../../interfaces/interfaces";

describe("GroupController.createGroup tests", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });
  test("create groups works", async () => {
    const mockGroups = [
      {
        name: "Admin2",
        permissions: ["READ", "WRITE", "DELETE", "UPDATE", "UPLOAD_FILES"],
      },
      {
        name: "GalvinGroup",
        permissions: ["READ", "WRITE", "DELETE", "UPDATE", "UPLOAD_FILES"],
      },
      {
        name: "Group 5",
        permissions: ["READ", "WRITE", "DELETE", "UPDATE", "UPLOAD_FILES"],
      },
      {
        name: "UserGroup",
        permissions: ["READ", "WRITE", "DELETE", "UPDATE", "UPLOAD_FILES"],
      },
    ];
    mockGroups.forEach(async (group) => {
      const { name, permissions } = group;
      const req = getMockReq({
        body: { name, permissions },
      });
      const { res, next } = getMockRes();
      await GroupController.createGroup(req, res, next);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({
        name: group.name,
        permissions: group.permissions,
      });
    });
  });
  test("create group throws error with no body data", async () => {
    const req = getMockReq();
    const { res, next } = getMockRes();
    try {
      await GroupController.createGroup(req, res, next);
    } catch (error) {
      expect(res.status).toBeCalledWith(500);
      expect(error).toEqual(
        new Error(`unhandledRejection in post request to /groups`)
      );
    }
  });
  test("create group throws error with insufficient body data", async () => {
    const req = getMockReq({
      body: {
        name: "Test Name",
      },
    });
    const { res, next } = getMockRes();
    try {
      await GroupController.createGroup(req, res, next);
    } catch (error) {
      expect(res.status).toBeCalledWith(500);
      expect(error).toEqual(
        new Error(`unhandledRejection in post request to /groups`)
      );
    }
  });
});

describe("GroupController.getAll tests", () => {
  let groups: GroupAttributes[] = [];
  beforeAll(async () => {
    await sequelize.authenticate();
    groups = await GroupController.getAllGroups();
  });
  test("get all groups", async () => {
    const req = getMockReq();
    const { res, next } = getMockRes();
    await GroupController.getAll(req, res, next);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(groups);
  });
});

describe("GroupController.getByID tests", () => {
  let groups: GroupAttributes[] = [];
  beforeAll(async () => {
    await sequelize.authenticate();
    groups = await GroupController.getAllGroups();
  });
  test("getByID throws an error if ID not in params", async () => {
    const req = getMockReq();
    const { res, next } = getMockRes();
    try {
      await GroupController.getByID(req, res, next);
    } catch (error) {
      expect(res.status).toBeCalledWith(500);
      expect(error).toEqual(
        new Error(`unhandledRejection in post request to /groups/undefined`)
      );
    }
  });
  test("getByID throws an error if ID not in DB", async () => {
    const fakeID = "THIS_ID_DOES_NOT EXIST";
    const req = getMockReq({
      params: { groupID: fakeID },
    });
    const { res, next } = getMockRes();
    try {
      await GroupController.getByID(req, res, next);
    } catch (error) {
      expect(res.status).toBeCalledWith(500);
      expect(error).toEqual(
        new Error(`unhandledRejection in post request to /groups/${fakeID}`)
      );
    }
  });
  test("getByID works with an existing id and returns group json", async () => {
    for (let group of groups) {
      const req = getMockReq({
        params: { groupID: group.id },
      });
      const { res, next } = getMockRes();
      await GroupController.getByID(req, res, next);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({ ...group });
    }
  });
});

describe("GroupController.updateGroup tests", () => {
  let groups: GroupAttributes[] = [];
  beforeAll(async () => {
    await sequelize.authenticate();
    groups = await GroupController.getAllGroups();
  });
  test("updateGroup throws error if no groupID or req.body", async () => {
    const req = getMockReq();
    const { res, next } = getMockRes();
    try {
      await GroupController.updateGroup(req, res, next);
    } catch (error) {
      expect(res.status).toBeCalledWith(500);
      expect(error).toEqual(
        new Error(`unhandledRejection in put request to /groups/undefined`)
      );
    }
  });
  test("updateGroup works with passing correct existing id to params, no body results in no update", async () => {
    for (let group of groups) {
      const req = getMockReq({
        params: {
          groupID: group.id,
        },
      });
      const { res, next } = getMockRes();
      await GroupController.updateGroup(req, res, next);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(group);
    }
  });
  test("updateGroup works and updates correct fields in group", async () => {
    let group = groups[0];
    let newGroupName = "New Name";
    let newPermissions = ["READ"];
    const req = getMockReq({
      params: { groupID: group.id },
      body: {
        name: newGroupName,
        permissions: newPermissions,
      },
    });
    const { res, next } = getMockRes();
    await GroupController.updateGroup(req, res, next);
    expect(res.status).toBeCalledWith(200);
    const updatedGroup = await Group.findOne({ where: { id: group.id } });
    expect(updatedGroup.name).toBe(newGroupName);
    expect(updatedGroup.permissions).toStrictEqual(newPermissions);
  });
});

describe("GroupController.deleteGroup tests", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });
  test("delete all groups", async () => {
    const groups = await GroupController.getAllGroups();
    for (let group of groups) {
      const req = getMockReq({
        params: { groupID: group.id },
      });
      const { res, next } = getMockRes();
      await GroupController.deleteGroup(req, res, next);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({ message: "Group deleted" });
    }
  });
});
