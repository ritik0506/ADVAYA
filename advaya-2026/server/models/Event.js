import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mythologyName: {
      type: String,
      required: [true, 'Mythology name is required'],
      trim: true,
    },
    actualName: {
      type: String,
      required: [true, 'Actual event name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['PG', 'UG', 'Combined', 'Non-Tech'],
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    rules: [
      {
        type: String,
      },
    ],
    teamSize: {
      min: {
        type: Number,
        required: true,
        min: 1,
      },
      max: {
        type: Number,
        required: true,
        min: 1,
      },
    },
    fee: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: '/assets/events/default.jpg',
    },
    duration: {
      type: String,
      default: 'TBA',
    },
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

// Index for faster queries
eventSchema.index({ eventId: 1 });
eventSchema.index({ category: 1 });

const Event = mongoose.model('Event', eventSchema);

export default Event;
