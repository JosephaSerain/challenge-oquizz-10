
/*
Jusqu'à présent, vous avez vu le dataMapper en mode 1 gros fichier où on fout toutes nos requêtes.
Dans la vraie vie, on fait pas comme ça, on découpe.
Exemple :
- userDataMapper :
    - findAll
    - findById
    - insert
    - update
    - etc.
- tagDataMapper :
    - findAll
    - findById
    - insert
    - update
    - etc.
- questionDataMapper :
    - findAll
    - findById
    - insert
    - update
    - etc.
- etc.
*/

const client = require("./client-db");
const Tag = require("../models/Tag");

const dataMapper = {
    async findAllUsers() {
        const result = await client.query('SELECT * FROM "user"');
        return result.rows;
    },

    async findUserById(id) {
        const result = await client.query('SELECT * FROM "user" WHERE id = $1', [id]);

        // Dans le cas où on ne trouve pas le résultat, je préfère retourner null que undefined :
        // - undefined a cette notion de "Je m'en suis pas occupé"
        // - null a cette notion de "Je m'en suis occupé, mais j'ai pas trouvé"
        return result.rows[0] ? result.rows[0] : null;
    },

    async findAllTags() {
        const result = await client.query('SELECT * FROM "tag"');

        // Maintenant qu'on a récupérer tous les tags dans la BDD, mais avec un format d'objet un peu naze par défaut,
        // On va prendre chacun de ces résultat, et en faire des objets issues de la classe Tag qu'on a crée précédemment.
        // Avantage : on se trimballe pas des objets sur lesquels on peut faire tout et n'importe quoi, mais des objets avec des gardes fou
        // des getters & setters, potentiellement des méthodes supplémentaires, etc.

        // let tags = [];
        // for (const tag of result.rows) {
        //     const tagFromClass = new Tag(tag);
        //     tags.push(tagFromClass);
        // }
        // return tags;

        return result.rows.map(tag => new Tag(tag));
    },
}

module.exports = dataMapper;
