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
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v); // Mobile number must start with 6-9 and be 10 digits
      },
      message: "Invalid phone number format",
    },
    required: function () {
      return this.parent().isCaptain; // Only required for captain
    },
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email regex
      },
      message: "Invalid email format",
    },
    required: function () {
      return this.parent().isCaptain; // Only required for captain
    },
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
  // topic: {
  //   type: String,
  //   required: [true, "Topic is required"],
  // },
  captain: {
    type: memberSchema,
    required: [true, "Team Captain details are required"],
  },
  member1: memberSchema,
  member2: memberSchema,
  member3: {
    type: memberSchema,
    required: function () {
      return this.teamSize === 4;
    },
    validate: {
      validator: function (value) {
        return this.teamSize === 4 ? !!value : true;
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

    // Collect USNs from team members
    const usns = [
      this.captain?.usn,
      this.member1?.usn,
      this.member2?.usn,
      ...(this.teamSize === 4 && this.member3 ? [this.member3.usn] : []),
    ].filter(Boolean); // Filter out undefined values

    // Check for duplicate USNs in the team
    if (usns.length !== new Set(usns).size) {
      return next(new Error("Duplicate USNs found in the team"));
    }

    // Check if any USN is already registered with another team
    const conflictingTeam = await mongoose.models.whackiestTeam.findOne({
      $or: [
        { "captain.usn": { $in: usns } },
        { "member1.usn": { $in: usns } },
        { "member2.usn": { $in: usns } },
        { "member3.usn": { $in: usns } }, // Corrected member3.usn
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
