const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactItemSchema = new Schema({
  contactname: {
    type: String,
    required: true,
  },
  contacttext: {
    type: String,
    required: true,
  },
});

const contact = mongoose.model("Contact", contactItemSchema);

module.exports = contact;
