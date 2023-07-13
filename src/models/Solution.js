import mongoose, { Schema, Types } from "mongoose";

const solutionSchema = new Schema(
  {
    user: { type: Types.ObjectId },
    title: String, // String is shorthand for {type: String}
    questionNo: Number,
    status: { type: String, required: true },
    level: { type: Number, required: true },
    language: { type: String, required: true },
    accuracy: { type: Number, required: true },
    code: { type: String, required: true },
    time: { type: String },
    score: { type: Number },
    note: { String },
  },
  { timestamps: true }
);

const solutionModel =
  mongoose.models.Solution || mongoose.model("Solution", solutionSchema);

export default solutionModel;
