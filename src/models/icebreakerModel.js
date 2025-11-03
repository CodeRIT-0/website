import mongoose from "mongoose";

const IcebreakerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    usn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    questionForClub: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "icebreaker25",
  }
);

const Icebreaker =
  mongoose.models.Icebreaker || mongoose.model("Icebreaker", IcebreakerSchema);

export default Icebreaker;
