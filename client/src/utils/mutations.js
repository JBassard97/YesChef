// mutations.js

import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      token
      user {
        _id
        firstname
        lastname
        email
      }
    }
  }
`;

export const CREATE_CONTACT = gql`
  mutation CreateContact($contactname: String!, $contacttext: String!) {
    createContact(contactname: $contactname, contacttext: $contacttext) {
      _id
      contactname
      contacttext
    }
  }
`;

// ! GOOD
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($_id: ID!) {
    deleteUser(_id: $_id) {
      _id
    }
  }
`;
