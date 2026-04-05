const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    phone: {
      type: String,
      required: true
    },
    skills: {
      type: [String],
      default: []
    },
    experience: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ["APPLIED", "SHORTLISTED", "REJECTED"],
      default: "APPLIED"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);