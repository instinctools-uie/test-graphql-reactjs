'use strict';

function createMockData(Model) {
  Model.deleteMany({}, error => error && console.error(error));
  Model.create([
    {
      firstName: 'Patrick',
      lastName: 'Smith',
      dateOfBirth: '12.12.1990',
      primaryLanguage: 'English',
      languages: ['English, German']
    },
    {
      firstName: 'John',
      lastName: 'Smith',
      dateOfBirth: '13.13.1980',
      primaryLanguage: 'German',
      languages: ['English, German']
    }
  ], error => error && console.error(error));
}

module.exports = createMockData;
