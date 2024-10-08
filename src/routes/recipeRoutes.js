import express from 'express'; // Import de Express pour créer le routeur
import RecipeController from '../controllers/RecipeController.js';
import CategoriRecipeController from '../controllers/CategoriRecipeController.js'; // Import du contrôleur de catégorie de recette
import {
  addRequestValidator,
  deleteRequestValidator,
  getByIdRequestValidator,
  updateRequestValidator,
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  getByIdCategorieRequestValidator,
} from '../validators/recipeValidator.js';

const router = express.Router();

router.get('/recipes', RecipeController.getAllRecipes);
router.get(
  '/recipes/:id',
  getByIdRequestValidator,
  RecipeController.getRecipeById
);
router.post('/recipes/add', addRequestValidator, RecipeController.addRecipe);
router.put(
  '/recipes/edit/:id',
  updateRequestValidator,
  RecipeController.updateRecipe
);
router.delete(
  '/recipes/delete/:id',
  deleteRequestValidator,
  RecipeController.deleteRecipe
);
// Route pour obtenir toutes les catégories
router.get('/categories', CategoriRecipeController.getCategories);
router.get(
  '/categories/:id',
  getByIdCategorieRequestValidator,
  CategoriRecipeController.getCategoryById
);
router.post(
  '/categories/add',
  addCategoryValidator,
  CategoriRecipeController.addCategorie
);
router.put(
  '/categories/edit/:id',
  updateCategoryValidator,
  CategoriRecipeController.updateCategorie
);
router.delete(
  '/categories/delete/:id',
  deleteCategoryValidator,
  CategoriRecipeController.deleteCategorie
);

export default router;
