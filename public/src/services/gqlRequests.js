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

export const updateEmployee = gql`
  mutation updateEmployee {
    updateEmployee(
      id: $id
      firstName: $firstName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      primaryLanguage: $primaryLanguage
      languages: $languages
    ) {
      id
      firstName
      lastName
      dateOfBirth
      primaryLanguage
      languages
    }
  }
`;
