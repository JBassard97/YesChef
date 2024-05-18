const {
  User,
  Availability,
  Schedule,
  Employee,
  Contact,
} = require("../models");
const bcrypt = require("bcrypt");
const { signToken, AuthenticationError } = require("../utils/auth");

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
      console.log(email, password);
      const user = await User.findOne({ email });
      console.log(user);

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
  },
};

module.exports = resolvers;
