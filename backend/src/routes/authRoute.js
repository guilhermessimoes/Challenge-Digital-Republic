const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signupPost);

router.post('/', authController.loginPost);

router.get('/logout', authController.logout);

module.exports = router;
