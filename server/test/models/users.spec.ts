import { connectDB, dropDB } from "../db";
import UserModel from "../../app/routes/v1/users/model";
import { assert } from "chai";
import { generateString } from "../utils";
import { IUserModel } from "../../app/types";

describe("User Schema Tests", () => {
  beforeEach(async function () {
    await connectDB();
  });

  it("should create a user successfully", async () => {
    const mock: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };
    const data = await UserModel.create(mock);
    assert.equal(mock.firstName, data.firstName);
    assert.equal(mock.lastName, data.lastName);
  });

  it("should update user successfully", async () => {
    const mock: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };

    const update: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };

    const created: IUserModel = await UserModel.create(mock);
    const updated: IUserModel | null = await UserModel.findOneAndUpdate(
      { _id: created._id },
      update,
      { new: true }
    );

    assert.equal(update.firstName, updated?.firstName);
    assert.equal(update.lastName, updated?.lastName);
  });

  it("should delete user successfully", async () => {
    const mock: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };

    const created: IUserModel = await UserModel.create(mock);
    await UserModel.findOneAndUpdate(
      { _id: created._id },
      { deleted: true },
      { new: true }
    );

    const user: IUserModel | null = await UserModel.findOne({
      _id: created._id,
      deleted: false,
    });

    assert.equal(null, user);
  });

  afterEach(async function () {
    await dropDB();
  });
});
