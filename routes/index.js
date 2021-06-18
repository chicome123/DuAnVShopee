var express = require('express');
var router = express.Router();
var async = require('async');
const ejsLint = require('ejs-lint');
const authController = require("../controllers/auth");


// Khởi tạo các router
router.get('/account/login', authController.getLogin);
router.post('/account/login', authController.postLogin);
router.post("/account/register", authController.postRegister);
router.get("/home",authController.getHome );
router.get("/giohang",authController.getGiohang);
router.post("/giohang", authController.postGiohang)
router.get("/giohang/xoa/:id", authController.deleteProduct);
router.post("/admin/product/add", authController.addManyProduct);
router.get('/sanphamchitiet',authController.getSanphamchitiet);

router.get('/' , (req , res)=>{
   res.clearCookie("username", { httpOnly: true });
   res.render('main/home');
 });

// router.get('/index' , (req , res)=>{
//    res.render('main/index');
// });

module.exports = router;
