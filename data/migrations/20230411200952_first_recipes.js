/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('recipes', table => {
        table.increments('recipe_id'); 
        table.string('recipe_name', 128)
            .notNullable()
            .unique();
        table.string('created_at');
    })
    .createTable('steps', table => {
        table.increments('step_id');
        table.string('step_instructions', 500)
            .notNullable();
        table.integer('step_number')
            .unsigned();
        table.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('recipe_id')
            .inTable('recipes')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
    })
    .createTable('ingredients', table => {
        table.increments('ingredient_id');
        table.string('ingredient_name', 128)
            .notNullable()
            .unique();
    })
    .createTable('ingredient_steps', table => {
        table.increments('ingredient_step_id');
        table.float('quantity')
            .notNullable()
            .unsigned();
        table.integer('ingredient_id')
            .unsigned()
            .notNullable()
            .references('ingredient_id')
            .inTable('ingredients')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
        table.integer('step_id')
            .unsigned()
            .notNullable()
            .references('step_id')
            .inTable('steps')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('ingredient_steps')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('recipes');
};
