const mongoose = require("mongoose");
const { User, Availability, Schedule } = require("../../models");
const { successLog, failureLog, completeLog } = require("../misc/colorLogs");

mongoose.connect("mongodb://localhost:27017/YesChef", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedSchedsAndAvails = async () => {
  try {
    const users = await User.find();
    successLog(`Found ${users.length} users`);

    for (let user of users) {
      const availability = new Availability({
        userId: user._id,
      });

      await availability.save();
      user.availability = availability._id;

      const schedule = new Schedule({
        userId: user._id,
      });

      await schedule.save();
      user.schedule = schedule._id;

      await user.save();
    }

    completeLog("Schedules and Availabilities linked!");
  } catch (error) {
    failureLog("Error seeding Schedules or Availabilities:\n");
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

seedSchedsAndAvails();
