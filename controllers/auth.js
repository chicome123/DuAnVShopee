const nodemailer = require('nodemailer');
const { FindOne, AddOne } = require('./connectdatabase');
exports.getShop = (req, res, next) => {
    res.render('shop');
};

exports.getLogin = (req, res, next) => {
    res.render('login');
};

exports.postLogin = async (req, res, next) => {
    // tim username
    // {username, password}
    let find_account = await FindOne(req.body.username);
    // console.log(find_account)
    if (!!find_account){
        // find_account la account trong db
        // find_account.password la password cua account trong db
        // req.body.passsword la password cua nguoi dung gui
        if (find_account.password == req.body.password){
            res.redirect('/');
            // res.status(200).send({message: "Dang nhap thanh cong"});
        }
        else{
            res.redirect('/login');
            // res.status(500).send({message: "Sai username hoac password"});
        }
    }
    else{
        res.redirect('/login');
        res.status(500).send({message: "Sai username hoac password"});
    }
};


exports.getRegister = (req, res, next) => {
    res.render('register');
};

exports.postRegister = async (req, res) => {
    console.log(req.body)
    if (!!req.body.username) {
        let password = Math.floor(Math.random() * 100000); // random password

        // console.log(await FindOne(req.body.username))
        let find_account = await FindOne(req.body.username);
        if (!!find_account) {
            // that bai
            //res.status(500).send({ message: "Tai khoan da ton tai" });
            return res.redirect('/register');
        }
        else {
            // thanh cong
            await AddOne(req.body.username, password);
            SendMail(req.body.username, password);
            res.status(200).send({ message: "Dang ky thanh cong" })
            return res.redirect('/register');
            
        }
    }
    else {
        return res.redirect('/register');
        // res.status(500).send({ message: "Dang ky that bai" });
    }
};


exports.SendMail = async (username, password) => {
    let email = username;
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "sieudat88@gmail.com", // generated ethereal user
        pass: "v@13102000", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'sieudat88@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world? pass cua ban la " + password, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
  
    console.log("info send mail: ", info)
  }