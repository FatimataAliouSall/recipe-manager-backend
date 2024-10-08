import { check, param, validationResult } from 'express-validator';
import Recipe from '../models/RecipeModel.js';
import Category from '../models/CategorieModel.js';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  next();
};

const addRequestValidator = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Le titre de la recette doit être unique.')
    .bail()
    .isLength({ min: 5, max: 100 })
    .withMessage('Le titre doit comporter au moins 5 ou au plus 100 caractères.')
    .bail()
    .custom(async (value) => {
      const existingRecipe = await Recipe.checkRecipe(value);
      if (existingRecipe) {
        throw new Error('Cette recette existe déjà.');
      }
      return true;
    }),
  check('type')
    .optional()
    .not()
    .isEmpty()
    .withMessage(
      'Le type de recette est obligatoire. Il doit être : entrée, plat, dessert.'
    ),
  check('ingredient')
    .optional()
    .not()
    .isEmpty()
    .isLength({ min: 10, max: 500 })
    .withMessage(
      'Les ingrédients doivent comporter au moins 10 ou au plus 500 caractères.'
    ),
  check('categorie_id')
    .not()
    .isEmpty()
    .withMessage('La catégorie ne peut pas être vide.')
    .bail()
    .isNumeric()
    .withMessage('La catégorie doit être un ID numérique.')
    .bail()
    .custom(async (value) => {
      const existingCategory = await Recipe.checkCategory(value);
      if (!existingCategory) {
        throw new Error('Cette catégorie n\'existe pas.');
      }
      return true;
    }),
  handleValidationErrors,
];

const deleteRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('ID est obligatoire.')
    .bail()
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette n\'existe pas.');
      }
      return true;
    }),
  handleValidationErrors,
];

const updateRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('ID de la recette est requis.')
    .bail()
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette n\'existe pas.');
      }
      return true;
    }),
  check('title')
    .optional()
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 100 })
    .withMessage('Le titre doit comporter au moins 5 ou au plus 100 caractères.')
    .bail()
    .custom(async (value, { req }) => {
      const existingRecipe = await Recipe.checkRecipe(value);
      if (existingRecipe && value !== req.body.title) {
        throw new Error('Cette recette existe déjà.');
      }
      return true;
    }),
  check('type')
    .optional()
    .not()
    .isEmpty()
    .withMessage('Le type de recette est requis.'),
  check('ingredient')
    .optional()
    .not()
    .isEmpty()
    .isLength({ min: 10, max: 500 })
    .withMessage(
      'Les ingrédients doivent comporter au moins 10 ou au plus 500 caractères.'
    ),
  check('categorie_id')
    .optional()
    .not()
    .isEmpty()
    .withMessage('La catégorie ne peut pas être vide.')
    .bail()
    .isNumeric()
    .withMessage('La catégorie doit être un ID numérique.')
    .bail()
    .custom(async (value) => {
      const existingCategory = await Recipe.checkCategory(value);
      if (!existingCategory) {
        throw new Error('Cette catégorie n\'existe pas.');
      }
      return true;
    }),
  handleValidationErrors,
];

const getByIdRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('ID de la recette est requis.')
    .bail()
    .custom(async (value) => {
      const recipe = await Recipe.getById(value);
      if (!recipe) {
        throw new Error('Cette recette n\'existe pas.');
      }
      return true;
    }),
  handleValidationErrors,
];

const addCategoryValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Le nom de la catégorie ne peut pas être vide.')
    .isLength({ max: 50 })
    .withMessage('Le nom de la catégorie ne doit pas dépasser 50 caractères.')
    .custom(async (value) => {
      const existingCategory = await Category.checkCategoryName(value);
      if (existingCategory) {
        throw new Error('Une catégorie avec ce nom existe déjà.');
      }
      return true;
    }),
  handleValidationErrors,
];

const updateCategoryValidator = [
  param('id')
    .isNumeric()
    .withMessage('ID de la catégorie doit être un nombre.'),
  check('name')
    .not()
    .isEmpty()
    .withMessage('Le nom de la catégorie ne peut pas être vide.')
    .isLength({ max: 50 })
    .withMessage('Le nom de la catégorie ne doit pas dépasser 50 caractères.')
    .bail()
    .custom(async (value, { req }) => {
      const existingCategory = await Category.checkCategoryName(value);
      if (existingCategory && existingCategory.id !== parseInt(req.params.id, 10)) {
        throw new Error('Une catégorie avec ce nom existe déjà.');
      }
      return true;
    }),
  handleValidationErrors,
];

const deleteCategoryValidator = [
  param('id')
    .isNumeric()
    .withMessage('ID de la catégorie doit être un nombre.')
    .bail()
    .custom(async (value) => {
      const categorie = await Category.getById(value);
      if (!categorie) {
        throw new Error('Cette catégorie n\'existe pas.');
      }
      const recipeCount = await Recipe.countByCategory(value);
      if (recipeCount > 0) {
        throw new Error('Impossible de supprimer cette catégorie car elle contient des recettes.');
      }
      return true;
    }),
  handleValidationErrors,
];

const getByIdCategorieRequestValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('ID de la catégorie est requis.')
    .bail()
    .custom(async (value) => {
      const categorie = await Category.getById(value);
      if (!categorie) {
        throw new Error('Cette catégorie n\'existe pas.');
      }
      return true;
    }),
  handleValidationErrors,
];

export {
  addRequestValidator,
  deleteRequestValidator,
  updateRequestValidator,
  getByIdRequestValidator,
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  getByIdCategorieRequestValidator,
};
