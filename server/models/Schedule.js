const mongoose = require("mongoose");
const { Schema } = mongoose;

const scheduleSchema = new Schema(
  {
    bossId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    monday: {
      type: String,
      default: "12:00 AM - 12:00 AM",
    },
    tuesday: {
      type: String,
      default: "12:00 AM - 12:00 AM",
    },
    wednesday: {
      type: String,
      default: "12:00 AM - 12:00 AM",
    },
    thursday: {
      type: String,
      default: "12:00 AM - 12:00 AM",
    },
    friday: {
      type: String,
      default: "12:00 AM - 12:00 AM",
    },
    saturday: {
      type: String,
      default: "12:00 AM - 12:00 AM",
    },
    sunday: {
      type: String,
      default: "12:00 AM - 12:00 AM",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = schedule;
