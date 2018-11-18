'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('books', [
      {institutions: ['1','2'], isbn: '3957393', title: "Algebra 1", author: "Math Genuis", createdAt: new Date(), updatedAt: new Date()},
      {institutions: ['1','2','3'], isbn: '8552154', title: "Algebra 2", author: "Bobby Newport", createdAt: new Date(), updatedAt: new Date()},
      {institutions: ['1','2','3','4'], isbn: '8512354', title: "Algebra 3", author: "Julian Smith", createdAt: new Date(), updatedAt: new Date()},
      {institutions: ['1'], isbn: '8640354', title: "Algebra 4", author: "Al Gebrah", createdAt: new Date(), updatedAt: new Date()}
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
