// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
// const DB = "shop";

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shop', {
  useNewUrlParser: true
});

var Sanpham = new mongoose.Schema({
  tensanpham: { type: String },
  tenhang: { type: String },
  anh: { type: Array },
  motasanpham: { type: String },
  soluong: { type: Number },
  giasanpham: { type: String }
}, { collection: 'product' });


module.exports = mongoose.model("product", Sanpham)

// Tao bang san pham
// const CreateProductDatabase = () => {
//   MongoClient.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = 
//     "CREATE TABLE product (tensanpham VARCHAR(255), tenhang VARCHAR(255), imagePreview VARCHAR(255), motasanpham VARCHAR(255), soluong int, giasanpham float";  
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });
// }

// const InsertManyProduct = (data)=>{
//   //console.log('name ', data.tensanpham)
//   MongoClient.connect(url, function(err, db) {
//       if (err) throw err;
//       var dbo = db.db(DB);
//       var myobj = {
//         tensanpham: data.tensanpham, 
//         tenhang: data.tenhang,
//         imagePreview: data.imagePreview, 
//         motasanpham: data.motasanpham, 
//         soluong: data.soluong, 
//         giasanpham: data.giasanpham};
//       dbo.collection("product").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("Number of product inserted: " + res.insertedCount);
//         db.close();
//       });
//     });
// }



// Hàm insert nhieu san pham vào db
// const InsertManyProduct = (data)=>{
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db(DB);
//         var myobj = data;
//         dbo.collection("product").insertMany(myobj, function(err, res) {
//           if (err) throw err;
//           console.log("Number of product inserted: " + res.insertedCount);
//           db.close();
//         });
//       });
// }

// Ham lay tat ca san pham trong db
// const FindAllProduct = ()=>{
//     return new Promise(resolve=>{
//         MongoClient.connect(url, function(err, db) {
//             if (err) throw err;
//             var dbo = db.db(DB);
//             dbo.collection("product").find({}).toArray(function(err, result) {
//               if (err) throw err;
//               resolve(result);
//               db.close();
//             });
//           });
//     })
// }

//  Truy van san pham theo _id
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

// bang them san pham den trang sanphamchitiet : sanphamchitiet.ejs




// module.exports = {
//   InsertManyProduct,
//   FindAllProduct,
//   CreateProductDatabase
//   FindOneProduct
// }
