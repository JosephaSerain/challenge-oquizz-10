require("dotenv").config();
const { Client } = require('pg');

const client = new Client(process.env.PG_URL);

client.connect();

// Si on veut tester, on peut décommenter ces lignes en attendant d'avoir un vrai datamapper
// test();
// async function test() {
//     const result = await client.query("SELECT * FROM tag");
//     console.log(result.rows);
//     client.end();
// }

module.exports = client;