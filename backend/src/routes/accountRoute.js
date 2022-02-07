const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const verifyLogin = require('../middlewares/session');

router.get('/', verifyLogin, accountController.accountGet);

router.post('/deposit', verifyLogin, accountController.depositPost);

router.post('/withdraw', verifyLogin, accountController.withdrawPost);

router.post('/transfer', verifyLogin, accountController.transferPost);

module.exports = router;
