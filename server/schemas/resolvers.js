const { User, Availability, Schedule, Store } = require("../models");
const bcrypt = require("bcrypt");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
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
    stores: async () => {
      return Store.find().populate("employees");
    },
    store: async (parent, { _id }) => {
      const store = await Store.findById(_id).populate({
        path: "employees",
        populate: {
          path: "availability schedule",
        },
      });
      if (!store) {
        throw new Error("Store not found with that ID!");
      }
      return store;
    },
  },

  Mutation: {
    createUser: async (parent, { input }) => {
      const user = await User.create(input);
      const token = signToken(user);
      return { token, user };
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
