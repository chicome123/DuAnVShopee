const {
    InsertOneAccount,
    FindOneAccount
} = require('../database/account')



exports.getHome = (req, res)=>{
    var username = req.cookies["username"];
    res.render("main/index", {username: username})
}

exports.getLogin = (req, res, next) => {
    res.render('account/login', {message: ""});
};

// API Login
exports.postLogin = async (req, res, next) => {

    // In request của user
    console.log(req.body)

    // tìm account trong db
    let data = await FindOneAccount(req.body.username, req.body.password)
    console.log(data.length)
    // Nếu chiều dài mảng > 0 thì có tồn tại account
    if (data.length > 0){
        // console.log("login success")
        res.cookie("username", data[0].username, { httpOnly: true })
        res.redirect("/home")
    }
    else{
        res.render("account/login", {message: "Đăng nhập thất bại"})

    }
};


// API Register
exports.postRegister = (req, res)=>{
    // In request cua user
    console.log(req.body)

    // Kiểm tra các fieldname tồn tại
    if (!!req.body.username && !!req.body.email && !!req.body.password){
        InsertOneAccount(req.body.username, req.body.email, req.body.password);
        res.render('account/login', {message: "Đăng ký thành công"}) // message là biến trả về cho ejs
    }
    else{
        res.render('account/login', {message: "Đăng ký thất bại"});

    }

}

exports.getLogOut = (req, res, next) => {
    // hàm này là để clear coookie
    res.clearCookie("username", { httpOnly: true });
    res.redirect("/");
}