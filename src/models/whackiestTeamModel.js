import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Member name is required"],
  },
  usn: {
    type: String,
    required: [true, "USN is required"],
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
  },
  teamSize: {
    type: Number,
    required: [true, "Team Size is required"],
    enum: [3, 4], // Restrict to 3 or 4 members
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
      message: "member3 is required if teamSize is 4",
    },
  },
});

const whackiestTeam = mongoose.models.whackiestTeam || mongoose.model("whackiestTeam", whackiestTeamSchema);

export default whackiestTeam;

