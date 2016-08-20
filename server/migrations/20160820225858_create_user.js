
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').unique().primary().notNullable();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.string('email').unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
