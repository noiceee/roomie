const { AES } = require('crypto-js');
const User = require('../models/User.js');
const router = require('express').Router();
const cryptoJs = require("crypto-js");
require('dotenv').config();

router.post("/signup", (req, res)=>{
    console.log(req.body);
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        contact: req.body.contact,
        password: AES.encrypt(req.body.password, process.env.SECRET_KEY)
    })
    newUser.save((err)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).json(newUser);
        }
    });
})

router.post("/login", (req, res)=>{
    console.log("Reciever request");
    try{
        let userFound = 0;
        User.findOne({email : req.body.email}, (err, user)=>{
            if(err){
                console.log(err);
            }else{
                //console.log(AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJs.enc.Utf8));
                if(user == null){
                    res.status(403).json("User not registered")
                } else {
                    const {password, ...info} = user._doc;
                    if(req.body.password == AES.decrypt(user.password, process.env.SECRET_KEY).toString(cryptoJs.enc.Utf8)){
                        res.status(200).json(info); 
                    }else{
                        res.status(401).json("Incorrect Password");
                    }
                }
            }
        });
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;