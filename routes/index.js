var express = require('express');
var router = express.Router();
var async = require('async');
const ejsLint = require('ejs-lint');
const authController = require("../controllers/auth");


// Khởi tạo các router
router.get('/account/login', authController.getLogin);
router.post('/account/login', authController.postLogin);
router.post("/account/register", authController.postRegister);
router.get("/home",authController.getHome )

router.get('/' , (req , res)=>{
   res.clearCookie("username", { httpOnly: true });
   res.render('main/home');
 });

router.get('/index' , (req , res)=>{
   res.render('main/index');
});

module.exports = router;
