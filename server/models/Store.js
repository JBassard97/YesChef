const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
