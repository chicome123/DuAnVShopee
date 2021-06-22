const {
    InsertOneAccount,
    FindOneAccount,
} = require('../database/account');

const {
    InsertManyProduct,
    FindAllProduct,
    // FindOneProduct
} = require('../database/product')



exports.getHome = async (req, res) => {
    var username = req.cookies["username"];
    var product = await FindAllProduct();
    console.log(product)
    res.render("main/index", { username: username, product: product })
}

exports.getLogin = (req, res, next) => {
    res.render('account/login', { message: "" });
};

// API Login
exports.postLogin = async (req, res, next) => {

    // In request của user
    console.log(req.body)

    // tìm account trong db
    let data = await FindOneAccount(req.body.username, req.body.password)
    console.log(data.length)

    if (data.length > 0) {
        // console.log("login success")
        res.cookie("username", data[0].username, { httpOnly: true })
        res.redirect("/home")
    }
    else {
        res.render("account/login", { message: "Đăng nhập thất bại" })

    }
};


// API Register
exports.postRegister = (req, res) => {
    // In request cua user
    console.log(req.body)

    // Kiểm tra các fieldname tồn tại
    if (!!req.body.username && !!req.body.email && !!req.body.password) {
        InsertOneAccount(req.body.username, req.body.email, req.body.password);
        res.render('account/login', { message: "Đăng ký thành công" })
    }
    else {
        res.render('account/login', { message: "Đăng ký thất bại" });
    }

}

exports.getLogOut = (req, res, next) => {
    // hàm clear coookie
    res.clearCookie("username", "product", { httpOnly: true });
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
exports.addManyProduct = (req, res) => {
    InsertManyProduct(req.body);
    res.send({ message: "Them thanh cong" })
}

exports.getSanphamchitiet = (req, res) => {
    var message = req.cookies.username;
    res.render('main/sanphamchitiet', { message: message });
}

exports.getChanelbecomenguoiban = (req, res) => {
    res.render('main/chanelnguoiban');
}

exports.getAdmin = (req, res) => {
    res.render('main/admin');
}

exports.getAddProduct = (req, res) => {
    var message = req.cookies.username;
    res.render('partials/addProduct', { message });
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