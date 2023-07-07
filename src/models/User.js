import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String, // String is shorthand for {type: String}
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "user" },
    password: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
