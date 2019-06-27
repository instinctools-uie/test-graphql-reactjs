'use strict';

const { getEmployees, getEmployee, createEmployee, updateEmployee, removeEmployee } = require('../controllers/employee');

const resolvers = {
  Query: {
    employee: (_, args) => getEmployee(args),
    employees: getEmployees
  },
  Mutation: {
    createEmployee: (_, args) => createEmployee(args),
    updateEmployee: (_, args) => updateEmployee(args),
    removeEmployee: (_, args) => removeEmployee(args)
  }
};

module.exports = resolvers;