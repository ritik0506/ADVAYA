import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    category: {
      type: String,
      enum: ['pg-technical', 'ug-technical', 'non-technical'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    maxParticipants: {
      type: Number,
      default: null,
    },
    registrationFee: {
      type: Number,
      default: 0,
    },
    rules: [
      {
        type: String,
      },
    ],
    prizes: {
      first: String,
      second: String,
      third: String,
    },
    coordinators: [
      {
        name: String,
        phone: String,
        email: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    registrationOpen: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
