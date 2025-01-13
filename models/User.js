const connection = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  
  static async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const [result] = await connection.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [userData.name, userData.email, hashedPassword, userData.role || 'user']
    );
    return result;
  }

  static async getAll(limit = 10, offset = 0) {
    const [rows] = await connection.query(
      'SELECT id, name, email, role, birthday, profilePicture, bio FROM users LIMIT ? OFFSET ?', 
      [limit, offset]
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await connection.query(
      'SELECT id, name, email, role, birthday, profilePicture, bio FROM users WHERE id = ?', 
      [id]
    );
    return rows[0];
  }

  static async update(id, userData) {
    const [result] = await connection.query(
      'UPDATE users SET ? WHERE id = ?',
      [userData, id]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await connection.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    return result;
  }

  static async search(term) {
    const [rows] = await connection.query(
      'SELECT id, name, email, role FROM users WHERE name LIKE ? OR email LIKE ?',
      [`%${term}%`, `%${term}%`]
    );
    return rows;
  }
}

module.exports = User;