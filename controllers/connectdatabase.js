const mongoose = require('mongoose');

const ConnectDB = () => {
    mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Ket noi mongoDB thanh cong");
        })
        .catch(err => {
            console.log("Ket noi mongoDB that bai: ", err);
        })
};


const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const accountModel = mongoose.model('account', accountSchema);

// Add one account
exports.AddOne = async (username, password) => {
    let object_account = {
        username: username,
        password: password
    }
    let account = new accountModel(object_account);
    await account.save()
}

exports.FindOne = async (username) => {
    let account = await accountModel.findOne({ username: username });
    return account;
}

module.exports = {
    ConnectDB
}