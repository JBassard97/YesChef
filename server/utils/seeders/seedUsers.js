const mongoose = require("mongoose");
const User = require("../../models/User");

const fakeUsers = require("./seeds/userSeeds.json");

mongoose.connect("mongodb://localhost:27017/YesChef", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedUsers = async () => {
    try {
        for (let user of fakeUsers) {
            await User.create(user);
            console.log(`User '${user.firstname}' added to database`)
        }
        console.log("All Users added successfully");
    } catch (error) {
        console.error("Error seeding users:\n", error)
    } finally {
        mongoose.disconnect();
    }
};

seedUsers();
