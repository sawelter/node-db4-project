const db = require('../../data/db-config');


/* 
{
  "recipe_id" : 1,
  "recipe_name": "Spaghetti Bolognese",
  "created_at": "2021-01-01 08:23:19.120",
  "steps": [
    {
      "step_id": 11,
      "step_number": 1,
      "step_instructions": "Put a large saucepan on a medium heat",
      "ingredients": []
    },
    {
      "step_id": 12,
      "step_number": 2,
      "step_instructions": "Add 1 tbsp olive oil",
      "ingredients": [
        { "ingredient_id": 27, "ingredient_name": "olive oil", "quantity": 0.014 }
      ]
    },
  ]
}
*/

/* 
select
    r.*,
    s.step_number,
    s.step_instructions,
    i.ingredient_name,
    i_s.*
from recipes as r
join steps as s
    on r.recipe_id = s.recipe_id
join ingredient_steps as i_s
    on i_s.step_id = s.step_id
join ingredients as i
    on i_s.ingredient_id = i.ingredient_id
where s.recipe_id = 3
*/

const getRecipeById = async (recipe_id) => {
    const recipe = await db('recipes').where('recipe_id', recipe_id);

    const rows = await db('recipes as r')
        .leftJoin('steps as s', 'r.recipe_id', '=', 's.recipe_id')
        .leftJoin('ingredient_steps as i_s', 's.step_id', '=', 'i_s.step_id')
        .leftJoin('ingredients as i', 'i_s.ingredient_id', '=', 'i.ingredient_id')
        .select(
            'r.*', 
            'i_s.*', 
            's.step_number', 
            's.step_instructions', 
            'i.ingredient_name')
        .where('r.recipe_id', recipe_id)
        .orderBy('step_number','asc');

    const result = rows.reduce((acc, row) => {
        if(row) {
            const ingredients = row.in
        }
        return acc;
        }, {
            recipe_id: rows[0].recipe_id,
            recipe_name: rows[0].recipe_name,
            created_at: rows[0].createdAt,
            steps: []
        });

    return recipe;
}


module.exports = {
    getRecipeById
}