const mongoose = require("mongoose");
const registerInfo = new mongoose.Schema({
    fname : {
        type:String,
        required:true
    },
    lname : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    phone : {
        type:Number,
        required:true,
        unique:true
    },
    address1 : {
        type:String,
        required:true
    },
    dob : {
        type:Date,
        required:true
    },
    gender : {
        type:String,
        required:true
    },
    pswd : {
        type:String,
        required:true
    }
})

//
const Register = new mongoose.model("Register",registerInfo);
module.exports = Register;