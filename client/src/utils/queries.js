import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query Me {
    me {
      _id
      firstname
      lastname
      email
      position
      phone
      availability {
        bossId
        _id
        monday
        tuesday
        wednesday
        thursday
        friday
        saturday
        sunday
      }
      schedule {
        _id
        bossId
        monday
        tuesday
        wednesday
        thursday
        friday
        saturday
        sunday
      }
      contacts {
        _id
        contactname
        contacttext
      }
      employees {
        _id
        firstname
        lastname
        position
        phone
        rate
        email
        availability {
          _id
          employeeId
          monday
          tuesday
          wednesday
          thursday
          friday
          saturday
          sunday
        }
        schedule {
          _id
          employeeId
          monday
          tuesday
          wednesday
          thursday
          friday
          saturday
          sunday
        }
      }
    }
  }
`;
