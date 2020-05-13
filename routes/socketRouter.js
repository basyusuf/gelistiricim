const express = require('express');
const router = express.Router();
const {
    socketWelcome
} = require('../controller/socketController');

router.get('/',socketWelcome);

module.exports = router;