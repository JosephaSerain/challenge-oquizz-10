
const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database");

class Quiz extends Model {}

Quiz.init(
    {
        title: DataTypes.STRING(128),
        description: DataTypes.STRING(128),
        user_id: DataTypes.INTEGER,
    },
    {
        sequelize,
        tableName: "quiz",
    }
);

module.exports = Quiz;
