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
      trim: true,
      uppercase: true,
      unique: true,
      minlength: [10, 'USN must be exactly 10 characters'],
      maxlength: [10, 'USN must be exactly 10 characters'],
      match: [/^[1-4][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/, 'Please enter a valid USN format (e.g., 1MS23CS001)']
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
    year: {
      type: String,
      required: [true, 'Year is required'],
      trim: true,
      enum: {
        values: ['1st Year', '2nd Year','3rd Year'],
        message: 'Year must be either 1st Year or 2nd Year'
      }
    },
    programmingInterests: {
      type: String,
      required: [true, 'Please tell us about your programming interests'],
      trim: true,
      maxlength: [500, 'Response cannot exceed 500 characters']
    },
    expectations: {
      type: String,
      required: [true, 'Please tell us what you would like to see from CodeRIT'],
      trim: true,
      maxlength: [500, 'Response cannot exceed 500 characters']
    },
    howDidYouHear: {
      type: String,
      required: [true, 'Please tell us how you heard about CodeRIT'],
      trim: true,
      maxlength: [200, 'Response cannot exceed 200 characters']
    },
    questionForClub: {
      type: String,
      required: [true, 'Please share your question'],
      trim: true,
      maxlength: [300, 'Question cannot exceed 300 characters']
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
