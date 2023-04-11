/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipes').truncate()
  await knex('recipes').insert([
    {recipe_name: 'Spaghetti Bolognese', created_at: "2022-01-01"},
    {recipe_name: 'Frozen Pizza', created_at: '2012-05-21'},
    {recipe_name: 'Cookie Dough', created_at: '2023-04-01'}
  ]);


  await knex('steps').truncate()
  await knex('steps').insert([
    {step_id: 11, instructions: 'Put a large saucepan on a medium heat', recipe_id: 1, step_number: 1},
    {step_id: 12, instructions: 'Add 1 tbsp olive oil', recipe_id: 1, step_number: 2},
    {step_id: 13, instructions: 'Turn on the oven', recipe_id: 2, step_number: 1},
    {step_id: 14, instructions: 'Put the pizza in the oven', recipe_id: 2, step_number: 2},
    {step_id: 15, instructions: 'Remove the pizza from the oven after 15 minutes', recipe_id: 2, step_number: 3},
    {step_id: 16, instructions: 'Mix together butter, eggs, and flour', recipe_id: 3, step_number: 1},
    {step_id: 17, instructions: 'Add in oats, chocolate chips, and sugar', recipe_id: 3, step_number: 2}
  ]);


  await knex('ingredients').truncate();
  await knex('ingredients').insert([
    {ingredient_id: 27, ingredient_name: 'olive oil'},
    {ingredient_id: 28, ingredient_name: 'chocolate chips'},
    {ingredient_id: 29, ingredient_name: 'oats'},
    {ingredient_id: 30, ingredient_name: 'sugar'},
    {ingredient_id: 31, ingredient_name: 'flour'},
    {ingredient_id: 32, ingredient_name: 'butter'},
    {ingredient_id: 33, ingredient_name: 'eggs'}
  ]);

  await knex('ingredient_steps').truncate();
  await knex('ingredient_steps').insert([
    {ingredient_id: 27, step_id: 12, quantity: 0.014},
    {ingredient_id: 32, step_id: 16, quantity: 0.01},
    {ingredient_id: 33, step_id: 16, quantity: 3},
    {ingredient_id: 31, step_id: 16, quantity: 2},
    {ingredient_id: 29, step_id: 17, quantity: 2},
    {ingredient_id: 28, step_id: 17, quantity: 1.2},
    {ingredient_id: 30, step_id: 17, quantity: 2.2}
  ]);

};
