// controllers/UserController.js
const User = require('../models/User');

class UserController {
    static async create(req, res) {
        try {
          if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
          }
          if (/\d/.test(req.body.name)) {
            return res.status(400).json({ message: 'Name cannot contain numbers' });
          }
          const result = await User.create(req.body);
          res.status(201).json(result);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      }
    static async getAll(req, res) {
        try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const users = await User.getAll(limit, offset);
        res.json(users);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    }

    static async getById(req, res) {
        try {
        const user = await User.getById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    }

    static async update(req, res) {
        try {
        const result = await User.update(req.params.id, req.body);
        res.json(result);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    }

    static async delete(req, res) {
        try {
        await User.delete(req.params.id);
        res.status(204).send();
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    }

    static async search(req, res) {
        try {
        const users = await User.search(req.query.q);
        res.json(users);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    }
}

module.exports = UserController;