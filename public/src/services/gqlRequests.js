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

export const createEmployee = gql`
  mutation createEmployee(
    $firstName: String!
    $lastName: String!
    $dateOfBirth: String!
    $primaryLanguage: String!
    $languages: [String]!
  ) {
    createEmployee(
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

export const updateEmployee = gql`
  mutation updateEmployee(
    $id: String!
    $firstName: String!
    $lastName: String!
    $dateOfBirth: String!
    $primaryLanguage: String!
    $languages: [String]!
  ) {
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

export const removeEmployee = gql`
  mutation removeEmployee($id: String!) {
    removeEmployee(id: $id) {
      id
      firstName
      lastName
      dateOfBirth
      primaryLanguage
      languages
    }
  }
`;
