
const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database");

class User extends Model {}

User.init(
    {
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        password: DataTypes.STRING(128),
        firstname: DataTypes.STRING(128),
        lastname: DataTypes.STRING(128),
    },
    {
        sequelize,
        tableName: "user",
    }
);

module.exports = User;
