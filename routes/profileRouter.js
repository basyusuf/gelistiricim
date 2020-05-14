const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');
const profileImageUpload = require('../middleware/libraries/profileImageUpload');
const {
    myProfile,
    uploadImage
} = require('../controller/profileController');

router.get('/',verifyToken,myProfile);
router.post('/upload_image',[verifyToken,profileImageUpload.single('profile_image')],uploadImage);
module.exports = router;