const settings = require("./settings");
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.host,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const firstName = process.argv[2];
const lastName = process.argv[3];
const dob = process.argv[4];

knex('famous_people').insert({first_name: firstName, last_name: lastName, birthdate: dob}).asCallback((err) => {
  if(err) return error(err);

  console.log("successfully added!");
  knex.destroy();
});