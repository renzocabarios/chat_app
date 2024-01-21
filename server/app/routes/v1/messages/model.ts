import { Schema, model } from "mongoose";
import { RESOURCE } from "../../../constants";
import { IMessageModel } from "../../../types";

const option = {
  timestamps: true,
};

const schema = new Schema<IMessageModel>(
  {
    content: {
      type: String,
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: RESOURCE.GROUPS,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  option
);

export default model(RESOURCE.MESSAGES, schema);
