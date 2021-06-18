var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const DB = "shop";



// Hàm insert nhieu san pham vào db
const InsertManyProduct = (data)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        var myobj = data;
        dbo.collection("product").insertMany(myobj, function(err, res) {
          if (err) throw err;
          console.log("Number of product inserted: " + res.insertedCount);
          db.close();
        });
      });
}

// Ham lay tat ca san pham trong db
const FindAllProduct = ()=>{
    return new Promise(resolve=>{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(DB);
            dbo.collection("product").find({}).toArray(function(err, result) {
              if (err) throw err;
              resolve(result);
              db.close();
            });
          });
    })
}

// // Truy van san pham theo _id
// const FindOneProduct = (id) =>{
//   console.log(id)
//     return new Promise(resolve=>{ // resolve đóng vai trò như 1 return của 1 hàm
//         MongoClient.connect(url, function(err, db) {
//             if (err) throw err;
//             var dbo = db.db(DB);
//             var query = { id: id };
//             dbo.collection("product").find(query).toArray(function(err, result) {
//               if (err) throw err;
//               resolve(result);
//               db.close();
//             });
//           });
//     })
// }


module.exports = {
    InsertManyProduct,
    FindAllProduct,
    // FindOneProduct
}