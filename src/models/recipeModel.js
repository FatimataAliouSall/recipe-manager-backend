import db from '../config/db.js';

class RecipeModel {
  static async create({ title, type, ingredient, categorie_id }) {
    const query =
      'INSERT INTO recipes (title, type, ingredient, categorie_id) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, [
      title,
      type,
      ingredient,
      categorie_id,
    ]);
    return result;
  }

  static async checkRecipe(title) {
    const [rows] = await db.query(
      'SELECT COUNT(*) as count FROM recipes WHERE title = ?',
      [title]
    );
    return rows[0].count > 0;
  }

  static async checkCategory(categorie_id) {
    const [rows] = await db.query(
      'SELECT COUNT(*) as count FROM categories WHERE id = ?',
      [categorie_id]
    );
    return rows[0].count > 0;
  }

  static async getById(id) {
    const query = 'SELECT * FROM recipes WHERE id = ?';
    const [rows] = await db.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  static async update(id, updatedData) {
    const query =
      'UPDATE recipes SET title = ?, type = ?, ingredient = ?, categorie_id = ? WHERE id = ?';
    const [result] = await db.query(query, [
      updatedData.title,
      updatedData.type,
      updatedData.ingredient,
      updatedData.categorie_id,
      id,
    ]);
    return result;
  }

  static async delete(id) {
    const query = 'DELETE FROM recipes WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result;
  }

  static async getAll() {
    const query = `
      SELECT r.*, c.name as categorie_name 
      FROM recipes r 
      INNER JOIN categories c ON r.categorie_id = c.id
    `;
    const [rows] = await db.query(query);
    return rows;
  }
  static async countByCategory(categorie_id) {
    const query =
      'SELECT COUNT(*) as count FROM recipes WHERE categorie_id = ?';
    const [rows] = await db.query(query, [categorie_id]);
    return rows[0].count;
  }
}

export default RecipeModel;
