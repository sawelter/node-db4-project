const db = require('../../data/db-config');
    // const rows = await db('recipes as r')
    //     .leftJoin('steps as s', 'r.recipe_id', '=', 's.recipe_id')
    //     .leftJoin('ingredient_steps as i_s', 's.step_id', '=', 'i_s.step_id')
    //     .leftJoin('ingredients as i', 'i_s.ingredient_id', '=', 'i.ingredient_id')
    //     .select(
    //         'r.*', 
    //         'i_s.*', 
    //         's.step_number', 
    //         's.step_instructions', 
    //         'i.ingredient_name')
    //     .where('r.recipe_id', recipe_id)
    //     .orderBy('step_number','asc');

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
}*/

const getRecipeById = async (recipe_id) => {
    const rows = await db('recipes as r')
        .leftJoin('steps as s', 'r.recipe_id', '=', 's.recipe_id')
        .leftJoin('ingredient_steps as i_s', 's.step_id', '=', 'i_s.step_id')
        .leftJoin('ingredients as i', 'i_s.ingredient_id', '=', 'i.ingredient_id')
        .select(
            'r.*',
            'i_s.quantity',
            's.step_id',
            's.step_number', 
            's.step_instructions', 
            'i.*')
        .where('s.recipe_id', recipe_id)
        .orderBy('step_number','asc');


    const recipe = {
        recipe_name: rows[0].recipe_name,
        recipe_id: rows[0].recipe_id,
        created_at: rows[0].created_at,
        steps: []
    };

    let currentStep = 1;
    let row = 0;
    let addExtraRow = true;
    while(row < rows.length) {
      addExtraRow = true;
        if(rows[row].step_number === currentStep) {
            const newStep = {
                step_number: rows[row].step_number,
                step_id: rows[row].step_id,
                step_instructions: rows[row].step_instructions,
                ingredients: []
            }

            while(rows[row].ingredient_name && rows[row].step_number === currentStep) {
                newStep.ingredients.push({
                    ingredient_id: rows[row].ingredient_id,
                    ingredient_name: rows[row].ingredient_name,
                    quantity: rows[row].quantity
                })
                row++;
                addExtraRow = false;
            }

            recipe.steps.push(newStep);

            currentStep++;
        }    
        if(addExtraRow) {
          row++;
        }    
    }

    return recipe;
}


module.exports = {
    getRecipeById
}