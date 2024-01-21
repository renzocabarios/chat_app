import { Schema, model } from "mongoose";
import { RESOURCE } from "../../../constants";
import { IGroupModel } from "../../../types";

const option = {
  timestamps: true,
};

const schema = new Schema<IGroupModel>(
  {
    title: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  option
);

export default model(RESOURCE.GROUPS, schema);
