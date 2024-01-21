import mongoose from "mongoose";
import { RESOURCE } from "../../../constants/";
import { IAuthModel } from "../../../types";

const option = {
  timestamps: true,
};

const schema = new mongoose.Schema<IAuthModel>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: RESOURCE.USERS,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  option
);

export default mongoose.model(RESOURCE.AUTH, schema);
