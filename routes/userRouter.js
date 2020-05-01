const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');
const profileImageUpload = require('../middleware/libraries/profileImageUpload');
const { getAllUser,
    updateUserForID,
    getUserForID,
    createUser,
    deleteUser,
    uploadImage
    } = require('../controller/userController');

router.get('/',getAllUser);
router.get('/:user_id', getUserForID);
router.put('/:user_id', updateUserForID);
router.post('/', createUser);
router.delete('/:user_id', deleteUser);
router.post('/upload_image',[verifyToken,profileImageUpload.single('profile_image')],uploadImage);

module.exports = router;
