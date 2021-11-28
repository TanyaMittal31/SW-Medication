const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;
require(__dirname + "/register/db/connect");
const Register = require(__dirname + "/register/models/reg");
const Admin = require(__dirname + "/register/models/admin");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const static_path = path.join(__dirname + "/register/public");
app.use(express.static(static_path));
// app.set("view engine" , "hbs");
// hbs.registerPartials(__dirname + "/register/templates/partials");

app.get("/register" , (req, res) => {
    res.sendFile(__dirname + "/register/public/views/register.html");
});
app.get("/login" , (req, res) => {
    res.sendFile(__dirname + "/register/public/views/login.html");
});
app.get("/adminlogin" , (req, res) => {
    res.sendFile(__dirname + "/register/public/views/adminlogin.html");
});

// create a new user in database
app.post("/register" , async(req,res) => {
    try{
        const userReg = new Register({
            fname : req.body.fname,
            lname : req.body.lname,
            email : req.body.email,
            phone : req.body.phone,
            address1 : req.body.address1,
            dob : req.body.dob,
            gender : req.body.gender,
            pswd : req.body.pswd
        })
        const registered = await userReg.save();
        res.status(201).sendFile(__dirname + "/register/public/views/success.html")
    }
    catch(e){
        res.status(400).send(e);
    }
})

// login validation

app.post("/login" , async(req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.pswd;
        const useremail = await Register.findOne({email:email});
        if(useremail.pswd === password){
            res.status(201).sendFile(__dirname + "/register/public/views/success.html");
        }
        else{
            res.send("invalid login details");
        }
    } catch (error) {
        console.log("invalid login details");
    }
})

// admin login validation
app.post("/adminlogin" , async(req,res) => {
    try {
        const uname = req.body.uname;
        const password = req.body.pswd;
        const username = await Admin.findOne({uname:uname});
        if(username.pswd === password){
            res.status(201).sendFile(__dirname + "/register/public/views/success.html");
        }
        else{
            res.send("invalid login details");
        }
    } catch (error) {
        console.log("invalid login details");
    }
})

app.listen(port , () => {
    console.log(`server is running at port ${port}`);
});