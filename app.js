const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;
require(__dirname + "/register/db/connect");
require(__dirname + "/donation/db/connect");
const Register = require(__dirname + "/register/models/reg");
const Admin = require(__dirname + "/register/models/admin");
const Donate = require(__dirname + "/donation/models/donate");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const static_path = path.join(__dirname + "/register/public");
app.use(express.static(static_path));
const static_path1 = path.join(__dirname + "/donation/public");
app.use(express.static(static_path1));
const static_path2 = path.join(__dirname + "/donation/public/views");
app.use(express.static(static_path2));
const static_path3 = path.join(__dirname + "/donation/public/images");
app.use(express.static(static_path3));
const static_path4 = path.join(__dirname + "/home/public");
app.use(express.static(static_path4));

app.set("view engines" , "hbs");
app.set("views" , path.join(static_path2))

app.get("/home" , (req, res) => {
    res.sendFile(__dirname + "/home/public/views/index.html");
});
app.get("/home/register" , (req, res) => {
    res.sendFile(__dirname + "/register/public/views/register.html");
});
app.get("/home/login" , (req, res) => {
    res.sendFile(__dirname + "/register/public/views/login.html");
});
app.get("/home/adminlogin" , (req, res) => {
    res.sendFile(__dirname + "/register/public/views/adminlogin.html");
});
app.get("/home/donate" , (req, res) => {
    res.render(__dirname + "/donation/public/views/donate.hbs");
});
app.get("/mydonations" , async(req, res) => {
    try {
        const email = req.body.cemail;
        const phone = req.body.cphone;
        const useremail = await Register.findOne({email:email});
        registerInfo.find((err,docs) => {
            if(useremail.phone === phone){
                res.status(201).render("mydonations.hbs" , {
                    list : docs
                });
            }
            else{
                res.send("Sorry No data Found");
            }
        });
    } catch (error) {
        res.status(400).send("invalid details");
    }
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

// donate details
app.post("/donate" , async(req,res) => {
    try{
        const donateDetails = new Donate({
            fname : req.body.fname,
            lname : req.body.lname,
            cemail : req.body.cemail,
            cphone : req.body.cphone,
            caddress : req.body.caddress,
            pname : req.body.pname,
            mfg : req.body.mfg,
            exp : req.body.exp,
            price : req.body.price,
            qty : req.body.qty,
            pdesc : req.body.pdesc
            
        })
        const registered = await donateDetails.save();
        res.status(201).send("donation successful");
    }
    catch(e){
        res.status(400).send(e);
    }
})

// my donations page

app.listen(port , () => {
    console.log(`server is running at port ${port}`);
});