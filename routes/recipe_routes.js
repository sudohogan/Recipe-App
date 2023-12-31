const express = require('express');
const {addRecipe, getAllRecipes, updateRecipe, deleteRecipe, getSingleRecipe} = require('../controllers/recipe_controller');

const router = express.Router();

router.route('/recipes')
    .get(getAllRecipes)
    .post(addRecipe);
router.route(`/recipes/:name`)
    .get(getSingleRecipe)
    .delete(deleteRecipe)
    .patch(updateRecipe);

module.exports = router;
