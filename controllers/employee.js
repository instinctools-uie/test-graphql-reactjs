'use strict';

const EmployeeModel = require('../mongo/models/employee');

function getEmployees() {
  return EmployeeModel.find({});
}

function getEmployee({ id }) {
  return EmployeeModel.findById(id);
}

function createEmployee({ firstName, lastName, address, email, phoneNumber, dateOfBirth, primaryLanguage, languages }) {
  return EmployeeModel.create({ firstName, lastName, address, email, phoneNumber, dateOfBirth, primaryLanguage, languages });
}

function updateEmployee({ id, firstName, lastName, address, email, phoneNumber, dateOfBirth, primaryLanguage, languages }) {
  return EmployeeModel.findByIdAndUpdate(id, { firstName, lastName, address, email, phoneNumber, dateOfBirth, primaryLanguage, languages }, { new: true });
}

function removeEmployee({ id }) {
  return EmployeeModel.findByIdAndRemove(id);
}

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  removeEmployee
};