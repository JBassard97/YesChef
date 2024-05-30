const {
  User,
  Availability,
  Schedule,
  Employee,
  Contact,
} = require("../models");
const bcrypt = require("bcrypt");
const { signToken, AuthenticationError } = require("../utils/auth");
const { createSchedulePDF } = require("../utils/createSchedulePDF");
const path = require("path");
const { sendEmailWithPDF } = require("../utils/sendEmailWithPDF");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("availability")
          .populate("schedule")
          .populate("contacts")
          .populate({
            path: "employees", // Populate the employees field
            populate: {
              path: "availability", // Populate the availability field for each employee
            },
          })
          .populate({
            path: "employees", // Populate the employees field
            populate: {
              path: "schedule", // Populate the schedule field for each employee
            },
          });
      }
      throw new AuthenticationError();
    },
    users: async () => {
      return User.find();
    },
    user: async (parent, { _id }) => {
      const user = await User.findById({ _id });

      if (!user) {
        throw new Error("User not found with that username!");
      }
      return user;
    },
  },

  Mutation: {
    createUser: async (parent, { input }) => {
      const user = await User.create(input);
      // ! Assigning a boilerplate avail and sched and linking
      const newAvailability = await Availability.create({ bossId: user._id });
      const newSchedule = await Schedule.create({ bossId: user._id });

      // ! Linking above to new user
      user.availability = newAvailability._id;
      user.schedule = newSchedule._id;

      await user.save();

      const token = signToken(user);
      return { token, user };
    },
    createContact: async (_, { contactname, contacttext }, context) => {
      try {
        const contact = await Contact.create({
          contactname,
          contacttext,
        });

        const userId = context.user._id;
        await User.findByIdAndUpdate(userId, {
          $push: { contacts: contact._id },
        });

        await contact.save();
        return contact;
      } catch (error) {
        throw new Error("Failed to create contact");
      }
    },
    deleteContact: async (parent, { _id }, context) => {
      try {
        const contact = await Contact.findByIdAndDelete(_id);
        if (!contact) {
          throw new Error("Contact not found");
        }

        const userId = context.user._id;
        await User.findByIdAndUpdate(userId, {
          $pull: { contacts: contact._id },
        });

        return contact;
      } catch (error) {
        console.error("Error deleting contact:", error);
        throw new Error("An error occurred while deleting the contact.");
      }
    },
    createEmployee: async (parent, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const userId = context.user._id;

      const employee = await Employee.create({ ...input, bossId: userId });
      const availability = await Availability.create({
        employeeId: employee._id,
        bossId: userId,
      });
      const schedule = await Schedule.create({
        employeeId: employee._id,
        bossId: userId,
      });

      employee.availability = availability._id;
      employee.schedule = schedule._id;
      await employee.save();

      await User.findByIdAndUpdate(userId, {
        $push: { employees: employee._id },
      });

      return employee;
    },
    updateEmployee: async (parent, { _id, input }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(_id, input, {
        new: true,
      });

      if (!updatedEmployee) {
        throw new Error("Employee not found");
      }

      return updatedEmployee;
    },
    deleteEmployee: async (parent, { _id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const userId = context.user._id;

      const deletedEmployee = await Employee.findByIdAndDelete(_id);

      if (!deletedEmployee) {
        throw new Error("Employee not found");
      }

      await Availability.findByIdAndDelete(deletedEmployee.availability._id);

      await Schedule.findByIdAndDelete(deletedEmployee.schedule._id);

      await User.findByIdAndUpdate(userId, {
        $pull: { employees: deletedEmployee._id },
      });

      return deletedEmployee;
    },
    updateAvailability: async (parent, { _id, input }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      // Update the availability document
      const updatedAvailability = await Availability.findOneAndUpdate(
        { employeeId: _id },
        { ...input },
        { new: true }
      );

      if (!updatedAvailability) {
        const otherUpdatedAvailability = await Availability.findOneAndUpdate(
          { bossId: _id },
          { ...input },
          { new: true }
        );

        return otherUpdatedAvailability;
      }

      return updatedAvailability;
    },
    updateSchedule: async (parent, { _id, input }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const updatedSchedule = await Schedule.findByIdAndUpdate(
        _id,
        { ...input },
        { new: true, useFindAndModify: false }
      );

      if (!updatedSchedule) {
        throw new Error(
          `Schedule not found or could not be updated for ID: ${_id}.`
        );
      }

      return updatedSchedule;
    },
    updateUser: async (parent, { _id, input }) => {
      if (input.password) {
        const saltRounds = 10;
        input.password = await bcrypt.hash(input.password, saltRounds);
      }

      const updatedUser = await User.findByIdAndUpdate(_id, input, {
        new: true,
      });
      return updatedUser;
    },
    // ! GOOD
    login: async (parent, { email, password }) => {
      // console.log(email, password);
      const user = await User.findOne({ email });
      // console.log(user);

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    deleteUser: async (parent, { _id }) => {
      try {
        // Find the user to be deleted
        const userToDelete = await User.findById(_id);
        if (!userToDelete) {
          throw new Error("User not found!");
        }

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(_id);

        return deletedUser;
      } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("An error occurred while deleting the user.");
      }
    },
    emailSchedules: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const userId = context.user._id;
      try {
        const user = await User.findById(userId)
          .populate("availability")
          .populate("schedule");
        const employees = await Employee.find({ bossId: userId })
          .populate("availability")
          .populate("schedule");

        if (!user || !employees) {
          throw new Error("User or Employees not found");
        }

        let bossAndEmpsArray = [user, ...employees];

        const pdfFileName = await createSchedulePDF(bossAndEmpsArray);
        const pdfFilePath = path.resolve(__dirname, pdfFileName);
        console.log("PDF Created:\n", pdfFileName);
        console.log("Pdf Path:", pdfFilePath);

        for (const person of bossAndEmpsArray) {
          const email = person.email;
          if (email) {
            await sendEmailWithPDF(email, pdfFilePath);
          }
        }

        return user;
      } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error(`Failed to email: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
