const typeDefs = `
type User {
  _id: ID # Unique identifier for the user
  username: String! # Username of the user
  email: String! # Email of the user
  password: String
}

type Auth {
  token: ID! # JWT token for authentication
  user: User # Authenticated user
}

input CreateUserInput {
  username: String! # Username of the new user
  email: String! # Email of the new user
  password: String! # Password of the new user
}

input UpdateUserInput {
  username: String # New username for the user
  email: String # New email for the user
  password: String # New password for the user
}

type Query {
  me: User # Retrieve current authenticated user
  users: [User] # Retrieve all users
  user(username: String!): User # Retrieve a user by their username
}

type Mutation {
  createUser(input: CreateUserInput!): Auth # Create a new user
  updateUser(_id: ID!, input: UpdateUserInput!): User # Update a user by ID
  login(email: String!, password: String!): Auth # Login user and retrieve JWT token
  deleteUser(_id: ID!): User # Delete a user by ID
}
`;

module.exports = typeDefs;
