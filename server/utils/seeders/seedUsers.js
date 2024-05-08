const mongoose = require("mongoose");
const User = require("../../models/User");
const {successLog, failureLog, completeLog } = require("../misc/colorLogs");
const fakeUsers = require("./seeds/userSeeds.json");

mongoose.connect("mongodb://localhost:27017/YesChef", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedUsers = async () => {
    try {
        for (let user of fakeUsers) {
            await User.create(user);
            successLog(`User '${user.firstname}' added to database`)
        }
        completeLog("All Users added successfully");
    } catch (error) {
        failureLog("Error seeding users:\n")
        console.error(error);
    } finally {
        mongoose.disconnect();
    }
};

seedUsers();
