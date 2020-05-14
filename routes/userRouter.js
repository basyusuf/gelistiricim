const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');
const getAdminAccess = require('../middleware/getAdminAccess');

const { getAllUser,
    updateUserForID,
    getUserForID,
    createUser,
    banUser,
    deleteUser
    } = require('../controller/userController');

router.get('/',[verifyToken,getAdminAccess],getAllUser);
router.get('/:user_id',[verifyToken,getAdminAccess], getUserForID);
router.put('/:user_id',[verifyToken,getAdminAccess], updateUserForID);
router.post('/',[verifyToken,getAdminAccess],createUser);
router.delete('/ban/:user_id',[verifyToken,getAdminAccess],banUser);
router.delete('/delete/:user_id',[verifyToken,getAdminAccess],deleteUser);


module.exports = router;
