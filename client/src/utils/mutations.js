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

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(_id: $id) {
      _id
      contactname
      contacttext
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
      _id
      firstname
      lastname
      email
      position
      phone
      rate
      availability {
        _id
      }
      schedule {
        _id
      }
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
    updateEmployee(_id: $id, input: $input) {
      _id
      firstname
      lastname
      email
      position
      phone
      rate
      availability {
        _id
      }
      schedule {
        _id
      }
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
