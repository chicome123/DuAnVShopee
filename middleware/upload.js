const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === "image/jpg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpeg") {
            cb(null, './uploads/images')
        } else {
            cb(new Error("Khong tim thay image"))
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
        console.log(file.originalname);
    }
})

var upload = multer({ storage: storage })

module.exports = upload