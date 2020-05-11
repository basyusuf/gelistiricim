const express = require('express');
const router = express.Router();
const {
    getAllQuestion
} = require('../controller/questionController');

router.get('/',getAllQuestion);

module.exports = router;