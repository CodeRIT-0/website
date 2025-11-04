import mongoose from 'mongoose';

const IcebreakerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    usn: {
      type: String,
      required: [true, 'USN is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address'
      ]
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
      trim: true
    },
    questionForClub: {
      type: String,
      trim: true,
      maxlength: [300, 'Question cannot exceed 300 characters'],
      default: ''
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: 'icebreaker25'
  }
);

IcebreakerSchema.index({ email: 1 });
IcebreakerSchema.index({ usn: 1 });

const Icebreaker = mongoose.models.Icebreaker || mongoose.model('Icebreaker', IcebreakerSchema);

export default Icebreaker;
