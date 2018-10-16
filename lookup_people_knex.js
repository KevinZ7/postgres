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

function displayInfo(person,index){
  console.log(`- ${index+1}: ${person.first_name} ${person.last_name}, born '${formatDate(person.birthdate)}'`);
}

function formatDate(date) {

  var date = new Date(date),
      month = '' + (date.getMonth()),
      day = '' + date.getDate(),
      year = date.getFullYear();

  if(month.length < 2){
    month = '0' + month;
  }

  if(day.length < 2){
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

console.log('Searching....')
knex.select('*').from('famous_people').where('first_name',`${process.argv[2]}`).orWhere('last_name',`${process.argv[2]}`).asCallback((err,result) => {
  if (err) return console.error(err);
  console.log(`Found ${result.length} person(s) by the name '${process.argv[2]}':`)
  result.forEach(displayInfo);

  knex.destroy();
}) ;

