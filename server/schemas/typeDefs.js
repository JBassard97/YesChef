const typeDefs = `
type User {
  _id: ID 
  firstname: String!
  lastname: String!
  email: String!
  position: String
  availability: Availability
  schedule: Schedule
  store: Store
}

type Availability {
  _id: ID
  userId: ID
  monday: String
  tuesday: String
  wednesday: String
  thursday: String
  friday: String
  saturday: String
  sunday: String
}

type Schedule {
  _id: ID
  userId: ID
  monday: String
  tuesday: String
  wednesday: String
  thursday: String
  friday: String
  saturday: String
  sunday: String
}

type Store {
  _id: ID
  name: String!
  address: String!
  employees: [User]
}

type Auth {
  token: ID! # JWT token for authentication
  user: User # Authenticated user
}

input CreateUserInput {
  firstname: String!
  lastname: String!
  email: String!
  password: String!
  position: String
  availability: ID
  schedule: ID
  store: ID
}

input CreateStoreInput {
  name: String!
  address: String!
}

input UpdateUserInput {
  firstname: String
  lastname: String
  email: String
  password: String
  position: String
  availability: ID
  schedule: ID
  store: ID
}

input UpdateAvailabilityInput {
  monday: String
  tuesday: String
  wednesday: String
  thursday: String
  friday: String
  saturday: String
  sunday: String
}

input UpdateScheduleInput {
  monday: String
  tuesday: String
  wednesday: String
  thursday: String
  friday: String
  saturday: String
  sunday: String
}

input UpdateStoreInput {
  name: String
  address: String
}

type Query {
  me: User # Retrieve current authenticated user
  users: [User] # Retrieve all users
  user(_id: ID!): User # Retrieve a user by their username
  stores: [Store] # Retrieve all stores
  store(_id: ID!): Store # Retrieve a store by its ID
  scheduleByUserId(userId: ID!): Schedule # Retrieve schedule by userId
  availabilityByUserId(userId: ID!): Availability # Retrieve availability by userId
}

type Mutation {
  createUser(input: CreateUserInput!): Auth 
  updateUser(_id: ID!, input: UpdateUserInput!): User
  login(email: String!, password: String!): Auth
  deleteUser(_id: ID!): User
  updateAvailability(userId: ID!, input: UpdateAvailabilityInput!): Availability
  updateSchedule(userId: ID!, input: UpdateScheduleInput!): Schedule
  createStore(input: CreateStoreInput!): Store
  updateStore(_id: ID!, input: UpdateStoreInput!): Store
  deleteStore(_id: ID!): Store
}
`;

module.exports = typeDefs;
