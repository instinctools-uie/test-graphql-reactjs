'use strict';

function createMockData(Model) {
  Model.deleteMany({}, error => error && console.error(error));
  Model.create([
    {
      firstName: 'firstName',
      lastName: 'lastName',
      address: 'address',
      email: 'email',
      phoneNumber: 'phoneNumber',
      dateOfBirth: 'dateOfBirth',
      primaryLanguage: 'primaryLanguage',
      languages: ['languages']
    },
    {
      firstName: 'firstName2',
      lastName: 'lastName2',
      address: 'address2',
      email: 'email2',
      phoneNumber: 'phoneNumber2',
      dateOfBirth: 'dateOfBirth2',
      primaryLanguage: 'primaryLanguage2',
      languages: ['languages2']
    }
  ], error => error && console.error(error));
}

module.exports = createMockData;
