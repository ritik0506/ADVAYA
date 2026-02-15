import mongoose from "mongoose";

const teamRegistrationSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: [true, "College name is required"],
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      enum: ["UG", "PG"],
      required: [true, "Category (UG/PG) is required"],
    },
    coordinatorName: {
      type: String,
      required: [true, "Coordinator name is required"],
      trim: true,
    },
    coordinatorEmail: {
      type: String,
      required: [true, "Coordinator email is required"],
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"],
    },
    coordinatorPhone: {
      type: String,
      required: [true, "Coordinator phone number is required"],
      match: [/^[0-9]{10}$/, "Please enter valid 10-digit phone number"],
    },
    totalParticipants: {
      type: Number,
      required: true,
      min: [10, "Minimum 10 participants required"],
      max: [14, "Maximum 14 participants allowed"],
    },
    totalEvents: {
      type: Number,
      required: true,
      min: [8, "Minimum 8 events participation required"],
    },
    amountPaid: {
      type: Number,
      default: 2499,
      immutable: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

teamRegistrationSchema.index({ collegeName: 1, category: 1 }, { unique: true });

const TeamRegistration = mongoose.model("TeamRegistration", teamRegistrationSchema);

export default TeamRegistration;
