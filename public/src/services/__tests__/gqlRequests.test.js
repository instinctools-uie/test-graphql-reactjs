import { getEmployees, createEmployee, removeEmployee, updateEmployee } from '../gqlRequests';
import { gql } from 'apollo-boost/lib/index';

describe('GraphQL Service', () => {
  it('should get graphQL expected values', () => {
    expect(getEmployees).toBe(gql`
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
    `);

    expect(createEmployee).toBe(gql`
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
    `);

    expect(updateEmployee).toBe(gql`
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
    `);

    expect(removeEmployee).toBe(gql`
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
    `);
  });
});
