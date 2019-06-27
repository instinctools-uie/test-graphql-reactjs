'use strict';

const mongoose = require('mongoose');
const createMockData = require('../mock');

const Schema = mongoose.Schema;

const ModelSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    phoneNumber: String,
    dateOfBirth: String,
    primaryLanguage: String,
    languages: Array
  }
);

const Employee = mongoose.model('Employee', ModelSchema);

createMockData(Employee); // TODO: Remove after develop

module.exports = Employee;
