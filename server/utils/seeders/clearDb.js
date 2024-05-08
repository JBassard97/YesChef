const mongoose = require("mongoose");
const { User, Availability, Schedule, Store } = require("../../models");

mongoose.connect("mongodb://localhost:27017/pollData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const clearDatabase = async () => {
  try {
    // Remove all documents from each collection
    await User.deleteMany();
    await Availability.deleteMany();
    await Schedule.deleteMany();
    await Store.deleteMany();

    console.log("Database cleared successfully.");
  } catch (error) {
    console.error("Error clearing database:\n", error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
};

// Call the function to clear the database
clearDatabase();
