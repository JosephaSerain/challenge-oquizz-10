
const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database");

class Question extends Model {}

Question.init(
    {
        description: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        anecdote: DataTypes.STRING(128),
        wiki: DataTypes.STRING(128),
    },
    {
        sequelize,
        tableName: 'question',
    }
);

module.exports = Question;
