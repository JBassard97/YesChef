const mongoose = require("mongoose");
const { User, Store } = require("../../models");
const { successLog, failureLog, completeLog } = require("../misc/colorLogs");
const fakeStores = require("./seeds/storeSeeds.json");

mongoose.connect("mongodb://localhost:27017/YesChef", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedStores = async () => {
  try {
    let users = await User.find();
    let employeeIndex = 0;

    for (let store of fakeStores) {
      let createdStore = await Store.create(store);

      for (let i = employeeIndex; i < employeeIndex + 20; i++) {
        createdStore.employees.push(users[i]._id);
        users[i].store = createdStore._id;
        await users[i].save();
        successLog(
          `Employee ${users[i].firstname} added to ${createdStore.name}`
        );
      }

      employeeIndex += 20;
      await createdStore.save();
      completeLog(`Store ${createdStore.name} created`);
    }

    completeLog("Stores Seeded Successfully");
  } catch (error) {
    failureLog("Error seeding stores:\n");
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

seedStores();

module.exports = {seedStores};