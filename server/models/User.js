const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
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
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    position: {
      type: String,
      default: "General Manager",
    },
    phone: {
      type: String,
    },
    availability: {
      type: Schema.Types.ObjectId,
      ref: "Availability",
    },
    schedule: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee"
      }]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
