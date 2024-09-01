const client = require("../dataMapper/client-db");
const Answer = require("./Answer");
const Level = require("./Level");
const Question = require("./Question");
const Quiz = require("./Quiz");
const User = require("./User");
const sequelize = require("./database");

main()

async function main() {
    // Tests de Level

    const levels = await Level.findAll();
    console.log(levels);
    console.log(levels[0].name);
    console.log(levels[0].id);
    console.log(levels[0].created_at);

    const level = await Level.findByPk(2);
    console.log(level);
    console.log(level.name);

    // INSERT Solution 1
    // const newLevel = await Level.create({name: "Très difficile"});
    // console.log(newLevel);
    // console.log(newLevel.id);
    // console.log(newLevel.name);
    // console.log(newLevel.created_at);
    // INFO : Pour faire de l'insertion de plusieurs lignes d'un coup de façon optimisée, on peut utilier "bulkCreate" au lieu de "create".

    // INSERT Solution 2
    // const newLevel = new Level({name: "Très difficile"});
    const newLevel = Level.build({name: "Très difficile"}); // Recommandé par Sequelize pour créer une nouvelle instance.
    await newLevel.save();
    console.log(newLevel);
    console.log(newLevel.id);
    console.log(newLevel.name);
    console.log(newLevel.created_at);

    // UPDATE Solution 1
    // Cette solution, perso je ne l'utiliserai quasiment jamais.
    // Je l'utiliserai uniquement dans les très rares cas ou ma contrainte (mon where) serait sur autre chose que l'id.
    // await Level.update(
    //     {name: "Super difficile"},
    //     {
    //         where: {
    //             id: newLevel.id,
    //         },
    //     }
    // );

    // UPDATE Solution 2
    // On doit commencer par récupérer une instance de l'objet qu'on veut modifier. On peut :
    //  - faire un findByPk
    //  - faire un findOne
    //  - piocher dans le résultat d'un findAll
    //  - récupérer l'objet suite à une création (via create ou save...)
    // Ensuite on met à jour les valeurs qui doivent changer : ici le name.
    newLevel.name = "Super difficile";
    // Et enfin, on enregistre. La fonction save des models Sequelize sait tout seule si elle doit faire insert ou update :
    // En gros, si l'objet a un id, ce sera update, sinon ce sera insert.
    await newLevel.save();
    console.log(newLevel);
    console.log(newLevel.id);
    console.log(newLevel.name);
    console.log(newLevel.created_at);

    // DELETE Solution 1
    // await Level.destroy({
    //     where: {
    //         id: newLevel.id,
    //     },
    // });

    // DELETE Solution 2
    // On doit commencer par récupérer une instance de l'objet qu'on veut modifier : tout pareil que pour l'update.
    // On va executer la suppression
    await newLevel.destroy();

    // Tests de Question

    // const questions = await Question.findAll();
    // console.log(questions);
    // console.log(questions[0].anecdote);

    // const question = await Question.findByPk(3);
    // console.log(question);
    // console.log(question.description);

    // const firstQuestionQuiz6 = await Question.findOne({ where: { quiz_id: 6 } });
    // console.log(firstQuestionQuiz6);
    // console.log(firstQuestionQuiz6.wiki);

    // const allQuestionsQuiz6 = await Question.findAll({ where: { quiz_id: 6 } });
    // console.log(allQuestionsQuiz6);
    // console.log(allQuestionsQuiz6[0].wiki);

    // Tests de Answer

    // const answers = await Answer.findAll();
    // console.log(answers);
    // console.log(answers[0].description);

    // // Tests de Quiz

    // const quiz1 = await Quiz.findByPk(1);
    // console.log(quiz1);
    // console.log(quiz1.title);

    // // Tests sur User

    // const user3 = await User.findByPk(3);
    // console.log(user3);
    // console.log(user3.firstname);
}