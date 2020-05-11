const express = require('express');
const router = express.Router();
const {
    getAllEducation,
    createNewEducation,
    getAllPageForEducationId,
    getPageForEduId
    } = require('../controller/educationController');

router.get('/',getAllEducation);
router.post('/create',createNewEducation);
router.get('/detail/:eduId',getAllPageForEducationId);
router.get('/detail/:eduId/:pageNumber',getPageForEduId);

module.exports = router;