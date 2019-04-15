exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(tbl) {
    tbl.increments("id");
    tbl
      .string("username")
      .notNullable()
      .unique("uq_username");
    tbl
      .string("email")
      .notNullable()
      .unique("uq_email");
    tbl.string("password").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
