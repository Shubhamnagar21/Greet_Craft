const express = require('express');
const { updateProfile, uploadPhoto } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.put('/profile', protect, updateProfile);
router.post('/upload-photo', protect, upload.single('profileImage'), uploadPhoto);

module.exports = router;
