var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var messagebird = require('messagebird') 
const DB = "shop";

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '653937923548-0jpr3d7gnpg600i0lrbnpa1k3v27760c.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('shop');
});

// forgot-password
router.get("/forgot_password", (req, res) => {
  res.render("forgot_password")
})

// quy-che
router.get("/quy-che", (req, res) => {
  res.render("quy-che")
})
// shop chinh
router.get("/shopMain", checkAuthenticated, (req, res) => {
  let user = req.user;
  res.render("shopMain", { user });
})

// dang xuat
router.get("/logout", (req, res) => {
  res.clearCookie('session-token');
  res.redirect('/')
})

//view-all-product
router.get("/view-all-product", (req, res) => {
  res.render("view-all-product")
})


// register
router.get('/register', (req, res) => {
  res.render('register');
})

router.post("/register", (req, res) => {
  console.log(req.body.taikhoan);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(DB);
    var myobj = { email: req.body.taikhoan };
    dbo.collection("users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 users inserted");
      db.close();
    });
  });
  res.render("register")
})


// make request to verify API
router.post('/registerVerify', (req, res) => {
  var taikhoan = req.body.taikhoan;
  messagebird.verify.create(taikhoan, {
    template: "Your verification code is %token."
  }, function (err, respone) {
    if (err) {
      console.log(err);
      res.render('resigter', {
        error: err.errors[0].description
      });
    } else {
      console.log(respone);
      res.render('registerVerify', {
        id: respone.id
      })
    }
  })
  var id = req.body.id;
  var token = req.body.token;
  messagebird.verify.verify(id, token, function (err, respone) {
    if (err) {
      res.render('registerVerity', {
        error: err.errors[0].description,
        id: id
      });
    } else {
      res.render('register');
    }
  })
})



// login
router.get("/login", (req, res) => {
  res.render("login")
})

router.post("/login", (req, res) => {
  let token = req.body.token;
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
  }
  verify().then(() => {
    res.cookie('session-token', token);
    res.send('successfully')
  }).catch(console.error);

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(DB);
    var query = { email: req.body.taikhoan };
    dbo.collection("users").find(query).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result.length > 0) res.redirect("/");
      else res.render("login")
      db.close();
    });
  });
})

function checkAuthenticated(req, res, next) {
  let token = req.cookies('session-token');
  let user = {};
  async function verify() {
    const tiket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    });
    const payload = tiket.getPayload();
    user.name = payload.name;
    user.email = payload.email;
    user.picture = payload.picture;
  }
  verify().then(() => {
    req.user = user;
    next();
  }).catch(err => {
    res.redirect('/login');
  })
}

// forgot_password

module.exports = router;
