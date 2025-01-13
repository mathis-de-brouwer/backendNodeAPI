const News = require('../models/News');

class NewsController {
    static async create(req, res) {
        try {
            if (!req.body.title || !req.body.content) {
                return res.status(400).json({ message: 'Title and content are required' });
            }
            const result = await News.create(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getAll(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const offset = parseInt(req.query.offset) || 0;
            const news = await News.getAll(limit, offset);
            res.json(news);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getById(req, res) {
        try {
            const news = await News.getById(req.params.id);
            if (!news) {
                return res.status(404).json({ message: 'News article not found' });
            }
            res.json(news);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async update(req, res) {
        try {
            const result = await News.update(req.params.id, req.body);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async delete(req, res) {
        try {
            await News.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async search(req, res) {
        try {
            const news = await News.search(req.query.q);
            res.json(news);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = NewsController;