import { Schema, model } from "mongoose";
import { RESOURCE } from "../../../constants";
import { ITodoModel } from "../../../types";

const option = {
  timestamps: true,
};

const schema = new Schema<ITodoModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
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

export default model(RESOURCE.TODOS, schema);
