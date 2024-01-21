import { connectDB, dropDB } from "../db";
import userService from "../../app/routes/v1/users/service";
import { assert } from "chai";
import { generateString } from "../utils";
import { IUserModel } from "../../app/types";
import { ClientSession, startSession } from "mongoose";

describe("User Service Tests", () => {
  beforeEach(async function () {
    await connectDB();
  });

  it("should add a user successfully", async () => {
    const session: ClientSession = await startSession();
    const mock: any = {
      firstName: generateString(),
      lastName: generateString(),
    };
    const data = await userService.add(mock, session);
    assert.equal(mock.firstName, data[0].firstName);
    assert.equal(mock.lastName, data[0].lastName);
  });

  it("should update user successfully", async () => {
    const session: ClientSession = await startSession();

    const mock: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };

    const update: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };

    const created = await userService.add(mock, session);
    const data = await userService.update(
      { _id: created[0]?._id },
      update,
      session
    );

    assert.equal(update.firstName, data?.firstName);
    assert.equal(update.lastName, data?.lastName);
  });

  it("should delete user successfully", async () => {
    const session: ClientSession = await startSession();

    const mock: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };

    const created = await userService.add(mock, session);
    await userService.removeOne({ _id: created[0]._id }, session);

    const user: IUserModel[] = await userService.getAll();

    assert.equal(null, user[0]);
  });

  afterEach(async function () {
    await dropDB();
  });
});
