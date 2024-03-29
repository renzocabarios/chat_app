import { IUserModel } from "../../../types";
import model from "./model";
import { ClientSession } from "mongoose";

async function getAll() {
  return await model.find({ deleted: false });
}

async function add(_body: Partial<IUserModel>, session: ClientSession) {
  return await model.create([_body], { session });
}

async function update(
  filter: any,
  _body: Partial<IUserModel>,
  session: ClientSession
) {
  return await model.findOneAndUpdate(filter, _body, { new: true, session });
}

async function removeOne(filter: any, session: ClientSession) {
  return await model.findOneAndUpdate(
    filter,
    { deleted: true },
    { new: true, session }
  );
}

export default { getAll, add, update, removeOne };
