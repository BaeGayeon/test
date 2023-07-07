const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/list', adminController.getAllDeliveryList);
router.post('/signin', adminController.signIn);
router.post('/signup', adminController.signUp);

module.exports = router;
