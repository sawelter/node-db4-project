const db = require('../../data/db-config')

const checkRecipeId = async (req, res, next) => {
    const { recipe_id } = req.params;
    const recipe = await db('recipes').where('recipe_id', recipe_id).first();

    if(!recipe) {
        res.status(404).json({message: `Recipe with id ${recipe_id} does not exist`})
    } else {
        next();
    }
}

module.exports = {
    checkRecipeId
}