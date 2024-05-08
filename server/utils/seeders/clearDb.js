const mongoose = require("mongoose");
const { User, Availability, Schedule, Store } = require("../../models");
const { failureLog, completeLog } = require("../misc/colorLogs");

mongoose.connect("mongodb://localhost:27017/YesChef", {
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

    completeLog("Database cleared successfully.");
  } catch (error) {
    failureLog("Error clearing database:\n");
    console.error(error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
};

// Call the function to clear the database
clearDatabase();
