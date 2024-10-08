import Category from '../models/CategorieModel.js';

class CategoryRecipeController {
  static async getCategories(req, res) {
    try {
      const categories = await Category.getAll();
      res.json(categories);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Erreur lors de la récupération des catégories.' });
    }
  }

  static async getCategoryById(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.getById(id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ message: 'Catégorie non trouvée.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Erreur lors de la récupération de la catégorie.' });
    }
  }

  static async addCategorie(req, res) {
    const { nom } = req.body;
    try {
      const newCategorie = await Category.create(nom);
      res.status(201).json({
        message: 'Catégorie ajoutée avec succès.',
        id: newCategorie.insertId,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Erreur lors de lajout de la catégorie.' });
    }
  }

  static async updateCategorie(req, res) {
    const { id } = req.params;
    const { nom } = req.body;
    try {
      const categorie = await Category.getById(id);
      if (categorie) {
        await Category.update(id, nom);
        res.json({ message: 'Catégorie modifiée avec succès.', id, nom });
      } else {
        res.status(404).json({ message: 'Catégorie non trouvée.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Erreur lors de la modification de la catégorie.' });
    }
  }

  static async deleteCategorie(req, res) {
    const { id } = req.params;
    try {
      const categorie = await Category.getById(id);
      if (categorie) {
        await Category.delete(id);
        res.status(200).json({ message: 'Catégorie supprimée avec succès.' });
      } else {
        res.status(404).json({ message: 'Catégorie non trouvée.' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Erreur lors de la suppression de la catégorie.' });
    }
  }
}

export default CategoryRecipeController;
