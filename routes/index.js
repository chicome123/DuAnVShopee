var express = require('express');
var router = express.Router();
const authAccountUser = require('../controllers/auth');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', authAccountUser.getLogin);


module.exports = router;
