// Si on fait ces 2 lignes, on récupère les models SANS association, du coup, on est pas avancé par rapport à nos jointure
// const Level = require("./Level");
// const Question = require("./Question");

// Avec cette solution, on récupère nos models, AVEC association, on va donc pouvoir les gérer en plus si besoin.
const { Level, Question, Answer, Quiz, Tag } = require("./index");

main()

async function main() {
    // Récupération de levels avec les questions associées : on test le Level.hasMany(Question)

    // On va récupérer tous les niveaux avec les questions associées
    const levels = await Level.findAll({include: Question});

    // Si on a mis un alias sur la relation, on doit le préciser aussi en faisant la récupération...
    // const levels = await Level.findAll({
    //     include: {
    //         model: Question,
    //         as: "questions",
    //     }
    // });
    console.log(levels);

    // Récupération de questions avec les détails du level associés : on test le Question.belongsTo(Level)
    const questions = await Question.findAll({include: Level});
    console.log(questions);

    const questions100 = await Question.findByPk(100, {include: Level});
    console.log(questions100);

    // On teste la relation Question.hasMany(Answer)
    const questionsWithResponses = await Question.findAll({
        include: [
            {
                model: Answer
            },
            {
                association: "GoodAnswer"
            }
        ]
    });
    console.log(questionsWithResponses);

    // Entre question et answer, on a 2 relations :
    //  - une pour toutes les réponses de la question (bonnes ou mauvaises)
    //  - une pour la seule et unique bonne réponse de la question
    // Si on veut récupérer le tout dans une seule requête, il va nous falloir 2 includes, car on récupère 2 info différentes.
    // Pour passer plusieurs include, on va utiliser l'include en mode Array.
    // Comme on a 2 relations pour les même tables, pour éviter les conflits, on en a renommé une avec un alias.
    // Grace à cet alias, one ne risque plus de mélanger les 2.
    const question36 = await Question.findByPk(36, {
        include: [
            // {
            //     model: Answer
            // },
            Answer,
            {
                association: "GoodAnswer"
            }
        ]
    });
    console.log(question36);

    // On teste la relation Answer.belongsTo(Question)
    const answer36 = await Answer.findByPk(36, {
        include: [
            Question,
            {
                association: "ValidateQuestion"
            }
        ]
    });
    console.log(answer36);


    const quiz1 = await Quiz.findByPk(10, {include: Tag});
    console.log(quiz1);
    console.log(quiz1.Tags);

    const tag1 = await Tag.findByPk(1, {include: Quiz});
    console.log(tag1);
    console.log(tag1.Quizzes);
}