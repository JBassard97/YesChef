const typeDefs = `
type User {
  _id: ID 
  firstname: String!
  lastname: String!
  email: String!
  position: String
  phone: String
  availability: Availability
  schedule: Schedule
  employees: [Employee]
  contacts: [Contact]
}

type Employee {
  _id: ID
  bossId: ID
  firstname: String!
  lastname: String!
  email: String!
  position: String
  phone: String
  rate: String
  availability: Availability
  schedule: Schedule
}

type Availability {
  _id: ID
  bossId: ID
  employeeId: ID
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
  bossId: ID
  employeeId: ID
  monday: String
  tuesday: String
  wednesday: String
  thursday: String
  friday: String
  saturday: String
  sunday: String
}

type Contact {
  _id: ID!
  contactname: String!
  contacttext: String!
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
  phone: String
}

input CreateEmployeeInput {
  firstname: String!
  lastname: String!
  email: String!
  position: String
  phone: String
  rate: String
}

input UpdateEmployeeInput {
  firstname: String
  lastname: String
  email: String
  position: String
  phone: String
  rate: String
}

input UpdateUserInput {
  firstname: String
  lastname: String
  email: String
  password: String
  position: String
  phone: String
  availability: ID
  schedule: ID
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

type Query {
  me: User # Retrieve current authenticated user
  users: [User] # Retrieve all users
  user(_id: ID!): User # Retrieve a user by their _id
}

type Mutation {
  createUser(input: CreateUserInput!): Auth 
  updateUser(_id: ID!, input: UpdateUserInput!): User
  login(email: String!, password: String!): Auth
  deleteUser(_id: ID!): User
  createEmployee(input: CreateEmployeeInput!): Employee
  updateEmployee(_id: ID! input: UpdateEmployeeInput!): Employee
  deleteEmployee(_id: ID!): Employee
  createContact(contactname: String!, contacttext: String!): Contact!
  deleteContact(_id: ID!): Contact
  updateAvailability(_id: ID!, input: UpdateAvailabilityInput!): Availability
  updateSchedule(_id: ID!, input: UpdateScheduleInput!): Schedule
}
`;

module.exports = typeDefs;
