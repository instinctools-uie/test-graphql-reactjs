'use strict';

const EmployeeModel = require('../mongo/models/employee');

/**
 * Get all employees
 *
 * @return {Object} Promise with result
 */
function getEmployees() {
  return EmployeeModel.find({});
}

/**
 * Get employee by identifier
 *
 * @param {Object<id>} - Employee identifier
 *
 * @return {Object} Promise with result
 */
function getEmployee({ id }) {
  return EmployeeModel.findById(id);
}

/**
 * Create new employee
 *
 * @param {Object<firstName, lastName, dateOfBirth, primaryLanguage, languages>} - Employee data
 *
 * @return {Object} Promise with result
 */
function createEmployee({ firstName, lastName, dateOfBirth, primaryLanguage, languages }) {
  return EmployeeModel.create({ firstName, lastName, dateOfBirth, primaryLanguage, languages });
}

/**
 * Update employee by identifier
 *
 * @param {Object<id, firstName, lastName, dateOfBirth, primaryLanguage, languages>} - Employee data
 *
 * @return {Object} Promise with result
 */
function updateEmployee({ id, firstName, lastName, dateOfBirth, primaryLanguage, languages }) {
  return EmployeeModel.findByIdAndUpdate(id, { firstName, lastName, dateOfBirth, primaryLanguage, languages }, { new: true });
}

/**
 * Remove employee by identifier
 *
 * @param {Object<id>} - Employee identifier
 *
 * @return {Object} Promise with result
 */
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