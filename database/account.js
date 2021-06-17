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
// Để tránh lõi chưa tìm xong mà api trả về response thì ta dùng promise và async / await để giải quyết
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


module.exports = {
    InsertOneAccount,
    FindOneAccount
}