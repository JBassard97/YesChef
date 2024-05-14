const mongoose = require("mongoose");
const { User, Employee, Schedule, Availability } = require("../../models");
const { failureLog, completeLog } = require("../misc/colorLogs");
const fakeUsers = require("./seeds/userSeeds.json");
const fakeEmployees = require("./seeds/employeeSeeds.json");

mongoose.connect("mongodb://localhost:27017/YesChef", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedAll = async () => {
  try {
    let employeeIndex = 0;

    for (let user of fakeUsers) {
      let createdUser = await new User({ ...user });

      createdUser.availability = await new Availability({
        bossId: createdUser._id,
      });
      await createdUser.availability.save();

      createdUser.schedule = await new Schedule({ bossId: createdUser._id });
      await createdUser.schedule.save();

      for (let i = 0; i < 15; i++) {
        if (employeeIndex >= fakeEmployees.length) {
          break;
        }

        const employee = fakeEmployees[employeeIndex];

        let createdEmployee = await new Employee({ ...employee });

        createdEmployee.availability = await new Availability({
          employeeId: createdEmployee._id,
        });
        await createdEmployee.availability.save();

        createdEmployee.schedule = await new Schedule({
          employeeId: createdEmployee._id,
        });
        await createdEmployee.schedule.save();

        createdEmployee.bossId = createdUser._id;
        await createdUser.employees.push(createdEmployee._id);
        await createdEmployee.save();

        employeeIndex++;
      }

      await createdUser.save();
    }
    completeLog("All models seeded!\n");
  } catch (error) {
    failureLog("Failed to seed:\n");
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

seedAll();
