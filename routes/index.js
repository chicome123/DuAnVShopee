var express = require('express');
var router = express.Router();
var async = require('async');
const ejsLint = require('ejs-lint');
const upload = require('../middleware/upload');
const authController = require("../controllers/auth");
const bodyParser = require('body-parser');

// router.get('/account/login', authController.getLogin);

router.get('/account/login', authController.getLogin);
router.post('/account/login', authController.postLogin);
router.post("/account/register", authController.postRegister);
router.get("/home", authController.getHome);
router.get("/giohang", authController.getGiohang);
router.post("/giohang", authController.postGiohang)
router.get("/giohang/xoa/:id", authController.deleteProduct);
// router.post("/admin/product/add", authController.addManyProduct);
router.get('/sanphamchitiet', authController.getSanphamchitiet);
router.get('/trothanhnguoiban', authController.getChanelbecomenguoiban);
router.get('/themsanpham', authController.getAddProduct);
router.post("/themsanpham", upload.single('imageUpload'), authController.addManyProduct);
router.get('/admin', authController.getAdmin);
router.get('/infoCustomer', authController.getInfoCustomer);
router.get('/changepassword', authController.getChangepassoword);
router.get('/tinhtrangdonhang', authController.getTinhtrangdonhang);
router.post('/uploadfile', upload.any(), authController.uploadfile);




router.get('/', (req, res) => {
  res.clearCookie("username", { httpOnly: true });
  res.render('main/home');
});

// router.get('/index' , (req , res)=>{
//    res.render('main/index');
// });

module.exports = router;
