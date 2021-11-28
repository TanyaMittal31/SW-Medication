const mongoose = require("mongoose");
const registerInfo = new mongoose.Schema({
    uname : {
        type:String,
        required:true,
        unique:true
    },
    pswd : {
        type:String,
        required:true
    }
})

//
const Admin = new mongoose.model("Admin",registerInfo);
module.exports = Admin;