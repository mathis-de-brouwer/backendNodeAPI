const connection = require('../config/database');

class News {
  static async create(newsData) {
    const [result] = await connection.query(
      'INSERT INTO news (title, image, content, publicationDate) VALUES (?, ?, ?, ?)',
      [newsData.title, newsData.image, newsData.content, newsData.publicationDate || new Date()]
    );
    return result;
  }

  static async getAll(limit = 10, offset = 0) {
    const [rows] = await connection.query(
      'SELECT * FROM news ORDER BY publicationDate DESC LIMIT ? OFFSET ?', 
      [limit, offset]
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await connection.query(
      'SELECT * FROM news WHERE id = ?', 
      [id]
    );
    return rows[0];
  }

  static async update(id, newsData) {
    const [result] = await connection.query(
      'UPDATE news SET ? WHERE id = ?',
      [newsData, id]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await connection.query(
      'DELETE FROM news WHERE id = ?',
      [id]
    );
    return result;
  }

  static async search(term) {
    const [rows] = await connection.query(
      'SELECT * FROM news WHERE title LIKE ? OR content LIKE ?',
      [`%${term}%`, `%${term}%`]
    );
    return rows;
  }
}

module.exports = News;