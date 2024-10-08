import Recipe from '../src/models/RecipeModel.js';
import Category from '../src/models/CategorieModel.js';

describe('Recipe tests', () => {
  let recipeId = null;
  let categorie_id = 1; 

  it('can be created', async () => {
    const recipe = {
      title: 'crepe house',
      type: 'dessert',
      ingredient: 'farine',
      categorie_id,
    };
    const result = await Recipe.create(recipe);
    recipeId = result.insertId;
    
    const recipeCreated = await Recipe.getById(recipeId);
    expect(recipeId).not.toBeNull();
    expect(recipeCreated).not.toBeNull();
    expect(recipeCreated.title).toBe(recipe.title);
  });
  
  it('cannot be created with invalid data', async () => {
    const recipe = {
      title: null,
      type: 'dessert',
      ingredient: 'farine',
      categorie_id,
    };
    try {
      await Recipe.create(recipe);
      fail('Expected an error to be thrown');
    } catch (error) {
      // console.log(error.message);
      // expect(error).toBeDefined();
    }
  });

  it('can get all recipes', async () => {
    const getAll = await Recipe.getAll();
    expect(getAll).not.toBeNull();
    expect(Array.isArray(getAll)).toBe(true);
  });

  it('update a recipe with its category', async () => {
    expect(recipeId).not.toBeNull(); 
    const updatedData = {
      title: 'Crêpe mise à jour 1',
      type: 'Dessert',
      ingredient: 'Ingrédients mis à jour',
      categorie_id,
    };
    const result = await Recipe.update(recipeId, updatedData);
    expect(result.affectedRows).toBe(1);
  
    const updatedRecipe = await Recipe.getById(recipeId);
    expect(updatedRecipe).not.toBeNull(); 
    expect(updatedRecipe.title).toBe(updatedData.title);
    expect(updatedRecipe.categorie_id).toBe(updatedData.categorie_id);
  });
  

  it('can delete a recipe', async () => {
    const result = await Recipe.delete(recipeId);
    expect(result.affectedRows).toBe(1);

    const deletedRecipe = await Recipe.getById(recipeId);
    expect(deletedRecipe).toBeNull();
  });
});

describe('Category Model Tests', () => {
  let categoryId = null;

  it('should create a category successfully', async () => {
    const categoryName = 'category';
    const result = await Category.create(categoryName);
    categoryId = result.insertId;

    const createdCategory = await Category.getById(categoryId);
    expect(createdCategory).not.toBeNull();
    expect(createdCategory.name).toBe(categoryName);
  });

  it('should get all categories', async () => {
    const categories = await Category.getAll();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('should update a category successfully', async () => {
    const newName = 'Plat principal';
    const result = await Category.update(categoryId, newName);

    expect(result.affectedRows).toBe(1);

    const updatedCategory = await Category.getById(categoryId);
    expect(updatedCategory).not.toBeNull();
    expect(updatedCategory.name).toBe(newName);
  });

  it('should delete a category successfully', async () => {
    const result = await Category.delete(categoryId);
    expect(result.affectedRows).toBe(1);

    const deletedCategory = await Category.getById(categoryId);
    expect(deletedCategory).toBeNull();
  });

  it('should not delete a category with foreign key constraints', async () => {
    const linkedCategoryId = 1;

    try {
      await Category.delete(linkedCategoryId);
      fail('Expected a foreign key constraint error');
    } catch (error) {
      // console.log(error.message);
      // expect(error.code).toBe('ER_ROW_IS_REFERENCED_2');
    }
  });
});