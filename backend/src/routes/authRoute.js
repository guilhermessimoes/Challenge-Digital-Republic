const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signupPost);

router.post('/', authController.loginPost);

router.get('/logout', (req, res) => {
    req.session.destroy();

    return res.status(201).json({ message: 'logout efetuado com sucesso.' });
});

module.exports = router;
