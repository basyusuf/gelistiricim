const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    createCategory,
    getCategoryForId
} = require('../controller/categoryController');

router.get('/',getAllCategories);
router.post('/',createCategory);
router.get('/:id',getCategoryForId);
module.exports = router;