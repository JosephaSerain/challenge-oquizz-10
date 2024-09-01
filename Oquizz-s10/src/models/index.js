
const Level = require("./Level");
const Question = require("./Question");
const Answer = require("./Answer");
const Tag = require("./Tag");
const Quiz = require("./Quiz");

// Relation entre Level et Question

// On est sur une relation One To Many

// On crée une relation qui permet à partir des levels, d'avoir l'ensemble des questions associées
// Les fonction de relations (hasMany, belongsTo, etc.) peuvent prendre un second paramètre d'options.
// On a vu que dans ces options, on pouvait indiquer une foreignKey. On a besoin de le mettre que si Sequelize essaye
// d'accéder à une clé étrangère mal nommé, sinon c'est pas la peine.
// Le plus simple pour pas se prendre la tête, vous essayez sans, et si le test vous relève une erreur, vous ajustez.
Level.hasMany(Question);

// Dans l'exemple juste au dessus, on se retrouve avec une propriété "Questions" dans nos levels, alors que tous le reste est
// en camelCase. Pour uniformiser, on pourrait vouloir "questions" au lieu de "Questions".
// Pour celà, on a la possibilité de passer un alias.
// Attention, si on utilise un alias, ça doit être précisé dans le include lors de la requete de récupération.
// Level.hasMany(Question, {
//     as: "questions"
// });

// On crée une relation qui permet à partir des questions, d'avoir le détail de son niveau (id, name, created_at, etc.)
Question.belongsTo(Level);

// On crée une relation qui permet à partir des questions, d'avoir la liste des réponses associées.
Question.hasMany(Answer);

// On crée une relation qui permet à partir des réponses, d'avoir le détail de sa question.
Answer.belongsTo(Question);

// On crée la relation entre question et Answer, mais par rapport à la bonne réponse uniquement.
// La relation permettent à partir du question, de trouver le détail de sa bonne réponse.
Question.belongsTo(Answer, {
    as: "GoodAnswer",
    foreignKey: "answer_id"
});

// La relation permettant à partir d'une réponse, de retrouver le détail de la questions associée.
Answer.hasOne(Question, {
    as: "ValidateQuestion",
    foreignKey: "answer_id"
});

// On crée la relation permettant à partir d'un quiz, de connaitre ses tags
Quiz.belongsToMany(Tag, { through: "quiz_has_tag" });

// On crée la relation qui permet à partir d'un tag, de connaitre ses quiz associés
Tag.belongsToMany(Quiz, { through: "quiz_has_tag" });

// On exporte tous nos modèles sur lesquels on a mis de relations, ce qui nous permettra dans les autres fichiers (test et controllers)
// de récupérer les modèles, mais la version avec association.
module.exports = { Level, Question, Answer, Tag, Quiz };
