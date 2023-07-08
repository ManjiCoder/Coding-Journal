import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String, // String is shorthand for {type: String}
    email: { type: String, required: true },
    role: { type: String, default: "user" },
    password: { type: String, required: true },
    friends: [
      {
        name: { type: String },
        friendUserId: { type: mongoose.Types.ObjectId },
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
