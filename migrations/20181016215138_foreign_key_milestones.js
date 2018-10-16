
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', (table) =>{
      table.integer('person_id').unsigned();
      table.foreign('person_id').references('famous_people.id');
    })
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('milestones', (table) =>{
      table.dropColumn('person_id');
    })
  ])
};
