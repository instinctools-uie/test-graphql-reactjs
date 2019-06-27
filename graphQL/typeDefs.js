'use strict';

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    id: String,
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    phoneNumber: String,
    dateOfBirth: String,
    primaryLanguage: String,
    languages: [String]
  }

  type Query {
    employee(id: String!): Employee,
    employees: [Employee]
  }
  
  type Mutation {
    createEmployee(
      firstName: String!,
      lastName: String!,
      address: String!,
      email: String!,
      phoneNumber: String!,
      dateOfBirth: String!,
      primaryLanguage: String!,
      languages: [String]!
    ): Employee,
    updateEmployee(
      id: String!,
      firstName: String!,
      lastName: String!,
      address: String!,
      email: String!,
      phoneNumber: String!,
      dateOfBirth: String!,
      primaryLanguage: String!,
      languages: [String]!
    ): Employee,
    removeEmployee(id: String!): Employee
  }
`;

module.exports = typeDefs;