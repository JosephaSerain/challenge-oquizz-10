
const client = require("./client-db");
const dataMapper = require("./dataMapper");
const Tag = require("../models/Tag");
const User = require("../models/User");

main();

async function main() {
    const users = await dataMapper.findAllUsers();
    console.log(users);

    const soloUser = await dataMapper.findUserById(3);
    console.log(soloUser);

    const soloUserInexistant = await dataMapper.findUserById(2);
    console.log(soloUserInexistant);

    const tags = await dataMapper.findAllTags();
    console.log(tags);
    console.log(tags[0].name);

    const tagsAR = await Tag.findAll();
    console.log(tagsAR);
    console.log(tagsAR[1].name);

    // Création d'un nouvreau tag
    const newTag = new Tag({
        name: "Série TV"
        // On ne met pas la ligne suivante sur l'id, car on ne connait pas l'id tant qu'on l'a pas enregistré...
        // On peut ne pas la mettre, parce que dans le Model, dans le constructor, on s'est laissé la possibilité de ne pas le renseigner
        // => voir le if dans le constructor de CoreModel.
        // id: ????,
    });
    // await newTag.insert();

    const usersAR = await User.findAll();
    console.log(usersAR);
    console.log(usersAR[0].firstname);

    client.end();
}
