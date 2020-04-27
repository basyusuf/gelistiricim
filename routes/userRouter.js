const express = require('express');
const router = express.Router();
const {getAllUser,
    updateUserForID,
    getUserForID,
    createUser,
    deleteUser
    } = require('../controller/userController');

router.get('/',getAllUser);
router.get('/:user_id', getUserForID);
router.put('/:user_id', updateUserForID);
router.post('/', createUser);
router.delete('/:user_id', deleteUser);

module.exports = router;
