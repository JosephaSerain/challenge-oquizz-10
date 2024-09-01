
const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database");

class Tag extends Model {}

Tag.init(
    {
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "tag",
    }
);

module.exports = Tag;
