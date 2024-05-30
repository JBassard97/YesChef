// ! Good to go

const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://jbassard97:4RdylWJwtGsUSMPp@cluster0.crhep98.mongodb.net/YesChef?retryWrites=true&w=majority&appName=Cluster0"
);

module.exports = mongoose.connection;
