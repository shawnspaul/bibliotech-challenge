'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('institutions', [
      {name: 'Anderson University', url: 'https://www.anderson.edu', email_domain: "anderson.edu", createdAt: new Date(), updatedAt: new Date()},
      {name: 'Indiana University', url: 'https://www.indiana.edu', email_domain: "indiana.edu", createdAt: new Date(), updatedAt: new Date()},
      {name: 'Purdue University', url: 'https://www.purdue.edu', email_domain: "purdue.edu", createdAt: new Date(), updatedAt: new Date()},
      {name: 'University of Indianapolis', url: 'https://www.uindy.edu', email_domain: "uindy.edu", createdAt: new Date(), updatedAt: new Date()}
    ]);

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
