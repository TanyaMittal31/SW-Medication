const mongoose = require("mongoose");
const registerInfo = new mongoose.Schema({
    fname : {
        type:String,
        required:true,
    },
    lname : {
        type:String,
        required:true
    },
    cemail : {
        type:String,
        required:true
    },
    cphone : {
        type:Number,
        required:true
        // unique:true
    }, 
    caddress : {
        type:String,
        required:true
    },
    pname : {
        type : String,
        required:true
    },
    mfg : {
        type:Date,
        required:true
    },
    exp : {
        type:Date,
        required:true
    },
    price : {
        type:Number,
        required:true
    },
    qty : {
        type:Number,
        required:true
    },
    pdesc : {
        type:String,
        required:true
    }  
})

// custom validation for email
registerInfo.path('cemail').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
},"Invalid email");

//
const Donate = new mongoose.model("Donate",registerInfo);
module.exports = Donate;