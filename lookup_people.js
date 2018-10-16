const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

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

function displayInfo(person,index){
  console.log(`- ${index+1}: ${person.first_name} ${person.last_name}, born '${formatDate(person.birthdate)}'`);
}

client.connect((err) => {
  if(err){
    return console.error("Connection Error", err);
  }

  console.log('Searching ...');
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text",[process.argv[2]],(err,result) => {
    if (err) {
      return console.error("error running query", err);
    }

  console.log(`Found ${result.rows.length} person(s) by the name '${process.argv[2]}':`)
  result.rows.forEach(displayInfo);

  });
});