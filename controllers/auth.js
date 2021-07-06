var mongoose = require('mongoose');
var express = require('express');
const uploadspModel = require('../database/product');
const AccountModel = require('../database/account');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { findOne } = require('../database/product');
const JWT_SECRET = 'aloxinchaocacbanmimhladatv@#!$#%'
mongoose.connect('mongodb://localhost/shop', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

var anhs = [];
exports.getHome = async (req, res) => {
  
    await uploadspModel.find({}, function (error, dulieu) {
        res.render('main/index', {
            data: dulieu,
            message: req.flash('message')
        });
    })
}

exports.getLogin = (req, res, next) => {
    res.render('account/login',
        { message: req.flash('message') });
};

// API Login
exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email == "" || password == "") {
        req.flash('message', 'Yêu cầu đồng chí điền đủ vào .DM');
        res.redirect('/account/login')
    }
    await AccountModel.findOne({
        email: email,
        password: password
    }).then(data => {
        if (data) {
            req.flash('message', 'Chào mừng Bro nhé!!!');
            res.redirect('/home')
        } else {
            req.flash('message', 'Sai cmn tài khoẳn hoặc mk rồi :((');
            res.redirect('/account/login')
        }
    }).catch(err => {
        res.status(500).json('Co loi ben Server')
    })
    let options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: true, // Indicates if the cookie should be signed
        AccountModel: new MongoStore({
            mongooseConnection: db
          })
    }
    res.cookie('username', AccountModel.findOne({username}),  options) 
    res.send('')
};

// API Register
exports.postRegister = async (req, res) => {
    // In request cua user
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if (username == "" || email == "" || password == "") {
        req.flash('message', 'Yêu cầu đồng chí điền đủ vào.');
        res.redirect('/account/login')
    } else {
        AccountModel.findOne({
            email: email
        })
            .then(data => {
                if (data) {
                    req.flash('message', 'Tài khoản bro đã tồn tại');
                    res.redirect('/account/login')
                } else {
                    return AccountModel.create({
                        username: username,
                        email: email,
                        password: password
                    })
                }
            })
            .then(data => {
                req.flash('message', 'Làm tốt lắm bro');
                res.redirect('/account/login')
            })
            .catch(err => {
                req.flash('message', 'Đăng ký thất bại');
                res.redirect('/account/login')
            })
    }

}


exports.getLogOut = (req, res, next) => {
    // hàm clear coookie
    res.clearCookie("username", { httpOnly: true });
    res.redirect("/");
}



exports.getGiohang = async (req, res, next) => {
    var product = req.cookies["product"];


    // console.log(product)
    var product_detail = []
    var product_of_db = await FindAllProduct();
    product.forEach(async value => {
        // console.log(value.id)
        let p = product_of_db.filter(item => item._id == value.id)[0];
        // console.log(p)
        p.number = value.number

        product_detail.push(p)
    })

    // console.log(req.cookies);
    var message = req.cookies.username;

    res.render('main/giohang', { product_detail: product_detail, message: message });
}

// Them san pham
exports.postGiohang = (req, res, next) => {
    // console.log(req.body)
    var product = req.cookies["product"];
    // console.log(product)
    if (!!product) {
        product.push(req.body)
    }
    else {
        product = [];
        product.push(req.body)
    }
    res.cookie("product", product, { httpOnly: true })
    res.redirect("/home");
}

exports.deleteProduct = (req, res) => {
    var product = req.cookies["product"];
    // console.log(product)
    console.log(req.params.id)
    product = product.filter(item => item.id != req.params.id);
    res.cookie("product", product, { httpOnly: true })
    res.redirect("/giohang");
}



// API add many product of admin
// exports.addManyProduct = (req, res) => {
//     InsertManyProduct(req.body);
//     res.send({ message: "Them thanh cong" })
// }

exports.addManyProduct = (req, res) => {
    // InsertManyProduct(req.body);
    var tensanpham = req.body.tensanpham;
    var tenhang = req.body.tenhang;
    var motasanpham = req.body.motasanpham;
    var soluong = req.body.soluong;
    var giasanpham = req.body.giasanpham;

    // khai bao doi tuong san pham

    var doituongsanpham = {
        "tensanpham": tensanpham,
        "tenhang": tenhang,
        "anh": anhs,
        "motasanpham": motasanpham,
        "soluong": soluong,
        "giasanpham": giasanpham
    }
    var dulieu = new uploadspModel(doituongsanpham);
    dulieu.save();

    console.log("them thanh cong")
    res.redirect("/themsanpham")
}

exports.getSanphamchitiet = async (req, res) => {
    var username = req.cookies.username;
    uploadspModel.find({}, function (error, dulieu) {
        console.log(dulieu);
        res.render('main/sanphamchitiet', { data: dulieu, username: username });
    })
}
exports.getChanelbecomenguoiban = (req, res) => {
    res.render('main/chanelnguoiban');
}

exports.getAdmin = (req, res) => {
    res.render('main/admin');
}

exports.getTinhtrangdonhang = (req, res) => {
    res.render('partials/tinhtrangdonhang');
}

exports.getAddProduct = (req, res) => {
    var message = req.cookies.username;
    res.render('partials/addProduct', { message });
}

exports.getChangepassoword = (req, res) => {
    var password = req.token.password;
    console.log("mat khau daksbdajhsdbs", password)
    const { token } = req.body
    const user = jwt.verify(token, JWT_SECRET)
    console.log(user)
    res.json({ status: 'ok' })
    res.render('account/doimk', { password });
}

exports.getInfoCustomer = async (req, res) => {
    var username = req.cookies.username;
    // let data = await FindOneAccount(req.body.email)
    var email = req.body.email;
    console.log(email);
    // var email = req.body.email; req.cookie("username", data[0].email)
    // console.log(email.length)
    res.render('partials/infocustomer', { username, email });
}

exports.uploadfile = (req, res) => {
    var anhtamthoi = req.files[0].path
    anhs.push(anhtamthoi);
    console.log(anhs);
    res.status(200).send(req.files);
}