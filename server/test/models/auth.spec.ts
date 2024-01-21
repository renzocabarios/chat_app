import { connectDB, dropDB } from "../db";
import AuthModel from "../../app/routes/v1/auth/model";
import UsersModel from "../../app/routes/v1/users/model";
import { assert } from "chai";
import { generateString } from "../utils";
import { IAuthModel, IUserModel } from "../../app/types";

describe("Auth Schema Tests", () => {
  beforeEach(async function () {
    await connectDB();
  });

  it("should create auth successfully", async () => {
    const mockUser: IUserModel = {
      firstName: generateString(),
      lastName: generateString(),
    };

    const user = await UsersModel.create(mockUser);

    const mockAuth: IAuthModel = {
      email: generateString(),
      password: generateString(),
      user: user._id,
    };

    const data = await AuthModel.create(mockAuth);

    assert.equal(mockAuth.email, data.email);
    assert.equal(mockAuth.password, data.password);
  });

  afterEach(async function () {
    await dropDB();
  });
});
