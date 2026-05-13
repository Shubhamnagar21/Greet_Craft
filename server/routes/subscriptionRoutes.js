const express = require('express');
const { upgradeSubscription } = require('../controllers/subscriptionController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/upgrade', protect, upgradeSubscription);

module.exports = router;
