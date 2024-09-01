
// Model est un equivalent de notre vieux CoreModel, mais en plus complet, plus testé, déjà tout fait, plus mieux quoi ...
// Datatypes est un objet qui permet de facilement vérifier les types des valeurs qu'on mettra dans nos instances de model.
const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database");

class Level extends Model {}

Level.init(
    {
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'level',
    }
);

module.exports = Level;
