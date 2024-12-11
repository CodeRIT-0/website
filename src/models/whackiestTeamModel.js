import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Member name is required"],
  },
  usn: {
    type: String,
    required: [true, "USN is required"],
    unique: false, // Checked manually for conflicts
  },
  year: {
    type: String,
    required: [true, "Year is required"],
  },
  branch: {
    type: String,
    required: [true, "Branch is required"],
  },
});

const whackiestTeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, "Team Name is required"],
    unique: true,
    index: true, // Ensure the index is created
  },
  teamSize: {
    type: Number,
    required: [true, "Team Size is required"],
    enum: [3, 4],
  },
  topic: {
    type: String,
    required: [true, "Topic is required"],
  },
  captain: {
    type: memberSchema,
    required: [true, "Team Captain details are required"],
  },
  member1: memberSchema,
  member2: memberSchema,
  member3: {
    type: memberSchema,
    validate: {
      validator: function () {
        return this.teamSize === 4 ? !!this.member3 : true;
      },
      message: "Member3 is required if teamSize is 4",
    },
  },
});

whackiestTeamSchema.pre("save", async function (next) {
  try {
    // Check if team name is unique
    const existingTeam = await mongoose.models.whackiestTeam.findOne({ teamName: this.teamName });
    if (existingTeam) {
      return next(new Error("Team Name already exists"));
    }

    // Validate unique USNs
    const usns = [
      this.captain.usn,
      this.member1.usn,
      this.member2.usn,
      ...(this.teamSize === 4 ? [this.member3.usn] : []),
    ];

    const conflictingTeam = await mongoose.models.whackiestTeam.findOne({
      $or: [
        { "captain.usn": { $in: usns } },
        { "member1.usn": { $in: usns } },
        { "member2.usn": { $in: usns } },
        { "member3.usn": { $in: usns } },
      ],
    });

    if (conflictingTeam) {
      return next(new Error("One or more USNs are already registered with another team"));
    }

    next();
  } catch (err) {
    next(err);
  }
});


whackiestTeamSchema.index({ teamName: 1 }, { unique: true });

const whackiestTeam = mongoose.models.whackiestTeam || mongoose.model("whackiestTeam", whackiestTeamSchema);

export default whackiestTeam;
