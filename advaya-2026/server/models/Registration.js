import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    teamId: {
      type: String,
      unique: true,
      required: true,
    },
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['UG', 'PG', 'UG/PG'],
    },
    registrationFee: {
      type: Number,
      required: true,
    },
    collegeName: {
      type: String,
      required: [true, 'College name is required'],
      trim: true,
      lowercase: true,
    },
    teamName: {
      type: String,
      required: [true, 'Team name is required'],
      trim: true,
    },
    teamSize: {
      type: Number,
      required: true,
      min: 1,
    },
    participants: [
      {
        name: {
          type: String,
          required: [true, 'Participant name is required'],
          trim: true,
        },
        mobile: {
          type: String,
          required: [true, 'Mobile number is required'],
          match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit mobile number'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          lowercase: true,
          trim: true,
          match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
      },
    ],
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'confirmed',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for faster queries
registrationSchema.index({ eventName: 1, collegeName: 1 });

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
