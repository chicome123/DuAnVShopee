var express = require('express');
var router = express.Router();
const indexUsers = require('../controllers/auth');

/* GET home page. */
router.get('/', indexUsers.getShop);
router.get('/login', indexUsers.getLogin);
router.post('/login', indexUsers.getLogin);
router.get('/register', indexUsers.getRegister);
router.post('/register', indexUsers.getRegister);


module.exports = router;
