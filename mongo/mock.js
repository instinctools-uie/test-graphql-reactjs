'use strict';

function createMockData(Model) {
  Model.deleteMany({}, error => error && console.error(error));
  Model.create([
    {
      firstName: 'firstName',
      lastName: 'lastName',
      dateOfBirth: 'dateOfBirth',
      primaryLanguage: 'primaryLanguage',
      languages: ['languages']
    },
    {
      firstName: 'firstName2',
      lastName: 'lastName2',
      dateOfBirth: 'dateOfBirth2',
      primaryLanguage: 'primaryLanguage2',
      languages: ['languages2']
    }
  ], error => error && console.error(error));
}

module.exports = createMockData;
