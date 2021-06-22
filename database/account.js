var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const DB = "shop";

// Hàm insert 1 account vào db
const InsertOneAccount = (username, email, password)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        var myobj = { username: username, email: email, password };
        dbo.collection("account").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 acount inserted");
          db.close();
        });
      });
}

// Hàm tìm 1 account trong db
const FindOneAccount = (username, password) =>{
    return new Promise(resolve=>{ // resolve đóng vai trò như 1 return của 1 hàm
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(DB);
            var query = { username: username, password: password };
            dbo.collection("account").find(query).toArray(function(err, result) {
              if (err) throw err;

              resolve(result); // return "result" bawfmg resolve

              db.close();
            });
          });
    })
}

//  cap nhat tai khoan
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("shop");
//   var myquery = { username: username , password};
//   var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
//   dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log("1 document updated");
//     db.close();
//   });
// });


module.exports = {
    InsertOneAccount,
    FindOneAccount
}