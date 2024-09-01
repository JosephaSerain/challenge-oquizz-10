
require("dotenv").config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        // createdAt: "created_at", // Override the name of the createdAt column if a string is provided, or disable it if false.
        // updatedAt: "updated_at", // Override the name of the updatedAt column if a string is provided, or disable it if false.

        // Dans notre BDD, on a tout nommé en snake_case. Du coup, plutot que devoir bricoler un peu partout à chaque fois que Sequelize
        // essaye de ne foutre du camelCase, on va carrement lui dire de nous lacher la grappe avec camel, et de tout faire en snake.
        underscored: true,
    }
});

module.exports = sequelize;
