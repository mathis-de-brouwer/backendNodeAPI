const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/NewsController');

router.get('/search', NewsController.search);
router.get('/', NewsController.getAll);
router.get('/:id', NewsController.getById);
router.post('/', NewsController.create);
router.put('/:id', NewsController.update);
router.delete('/:id', NewsController.delete);

module.exports = router;