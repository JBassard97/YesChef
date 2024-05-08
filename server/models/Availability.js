const mongoose = require("mongoose");
const { Schema } = mongoose;

const availabilitySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    monday: {
      type: String,
      default: "available",
    },
    tuesday: {
      type: String,
      default: "available",
    },
    wednesday: {
      type: String,
      default: "available",
    },
    thursday: {
      type: String,
      default: "available",
    },
    friday: {
      type: String,
      default: "available",
    },
    saturday: {
      type: String,
      default: "available",
    },
    sunday: {
      type: String,
      default: "available",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Availability = mongoose.model("Availability", availabilitySchema);

module.exports = Availability;