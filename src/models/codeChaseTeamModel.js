import mongoose from "mongoose";

const codeChaseTeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, "Team Name is required"],
    unique: true, 
    trim: true,
  },
  year: {
    type: String, 
    required: [true, "Year is required"],
    trim: true,
  },
  leaderName: {
    type: String,
    required: [true, "Leader Name is required"],
    trim: true,
  },
  leaderUsn: {
    type: String,
    required: [true, "Leader USN is required"],
    unique: true,
    uppercase: true,
    trim: true,
  },
  leaderMobile: {
    type: String,
    required: [true, "Leader Mobile Number is required"],
    trim: true,
  },
  member2Name: {
    type: String,
    required: [true, "Member 2 Name is required"],
    trim: true,
  },
  member2Usn: {
    type: String,
    required: [true, "Member 2 USN is required"],
    unique: true, 
    uppercase: true,
    trim: true,
  },
  member3Name: {
    type: String,
    required: [true, "Member 3 Name is required"],
    trim: true,
  },
  member3Usn: {
    type: String,
    required: [true, "Member 3 USN is required"],
    unique: true,
    uppercase: true,
    trim: true,
  },
}, {
  timestamps: true 
});


codeChaseTeamSchema.pre('save', async function (next) {
  const team = this;
  const usns = [team.leaderUsn, team.member2Usn, team.member3Usn].filter(Boolean); 

 
  if (new Set(usns).size !== usns.length) {
    return next(new Error('Duplicate USNs found within the team. Each member must have a unique USN.'));
  }

  const existingTeam = await mongoose.models.CodeChaseTeam.findOne({
    $or: [
      { leaderUsn: { $in: usns } },
      { member2Usn: { $in: usns } },
      { member3Usn: { $in: usns } },
    ],
    _id: { $ne: team._id } 
  });

  if (existingTeam) {
    
    const conflictingUsn = usns.find(usn =>
      [existingTeam.leaderUsn, existingTeam.member2Usn, existingTeam.member3Usn].includes(usn)
    );
    return next(new Error(`USN ${conflictingUsn} is already registered with another team.`));
  }

  next();
});


const CodeChaseTeam = mongoose.models.CodeChaseTeam || mongoose.model("CodeChaseTeam", codeChaseTeamSchema);

export default CodeChaseTeam; 