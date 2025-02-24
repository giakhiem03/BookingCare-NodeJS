"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Users", [
            {
                email: "admin@gmail.com",
                password: "123456",
                firstName: "Khiem",
                lastName: "Huynh",
                address: "4/12",
                gender: 1,
                roleId: "ROLE",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        //
    },
};
