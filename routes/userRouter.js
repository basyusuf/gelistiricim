const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');
const getAdminAccess = require('../middleware/getAdminAccess');
const profileImageUpload = require('../middleware/libraries/profileImageUpload');
const { getAllUser,
    updateUserForID,
    getUserForID,
    createUser,
    banUser,
    uploadImage,
    deleteUser
    } = require('../controller/userController');

router.get('/',[verifyToken,getAdminAccess],getAllUser);
router.get('/:user_id', getUserForID);
router.put('/:user_id', updateUserForID);
router.post('/',[verifyToken,getAdminAccess],createUser);
router.delete('/ban/:user_id',[verifyToken,getAdminAccess],banUser);
router.delete('/delete/:user_id',[verifyToken,getAdminAccess],deleteUser);
router.post('/upload_image',[verifyToken,profileImageUpload.single('profile_image')],uploadImage);

module.exports = router;
