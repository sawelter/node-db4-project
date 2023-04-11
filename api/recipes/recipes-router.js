const express = require('express');
const Recipe = require('./recipes-model');
const mid = require('./recipes-middleware');
const router = express.Router();


router.get('/:recipe_id', mid.checkRecipeId, async (req, res, next) => {
    const { recipe_id } = req.params;

    try {
        const recipe = await Recipe.getRecipeById(recipe_id);
        res.json(recipe);
    } catch(err) {
        next(err);
    }
});


module.exports = router;