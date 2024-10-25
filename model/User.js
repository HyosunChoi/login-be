const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


const userShema = Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
}, {timestamps : true});

//항상 패스워드를 제외하고 보낼 때 아래 코드를 사용할 수 있습니다
userShema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.password;
    delete obj.updateAt;

    return obj;
};
userShema.methods.generateToken = function () {
    const token = jwt.sign({_id : this._id},JWT_SECRET_KEY,{expiresIn : '1d'}); //1d는 하루
    return token;
}

const User = mongoose.model("User", userShema);
module.exports = User;