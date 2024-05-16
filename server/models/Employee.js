const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    bossId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    position: {
      type: String,
      default: "N/A",
    },
    phone: {
      type: String,
    },
    rate: {
      type: String,
      default: "00.00"
    },
    availability: {
      type: Schema.Types.ObjectId,
      ref: "Availability",
    },
    schedule: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const employee = mongoose.model("Employee", employeeSchema);

module.exports = employee;
