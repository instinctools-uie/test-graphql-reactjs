import { gql } from 'apollo-boost/lib/index';

export const getEmployees = gql`
  {
    employees {
      id
      firstName
      lastName
      dateOfBirth
      primaryLanguage
      languages
    }
  }
`;
