const express = require('express');
const router = express.Router();
const {
    getAllEducation,
    createNewEducation,
    getAllPageForEducationId
    } = require('../controller/educationController');

router.get('/',getAllEducation);
router.post('/create',createNewEducation);
router.get('/detail/:id',getAllPageForEducationId);

module.exports = router;