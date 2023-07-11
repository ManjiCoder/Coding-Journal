import mongoose, { Types } from "mongoose";
import { string } from "yup";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String, // String is shorthand for {type: String}
    email: { type: String, required: true },
    role: { type: String, default: "user" },
    password: { type: String, required: true },
    friends: {
      type: [
        {
          name: String,
          id: { type: Types.ObjectId },
        },
      ],
      default: [],
    },
    passwordHistory: {
      type: [
        {
          date: Date,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
