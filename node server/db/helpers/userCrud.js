const User=require("../models/userModel");

const testOps = require("./testCrud");

const sendEmails=require("../../utils/nodemailer");
const jsonWebToken=require("../../utils/jsonwebtoken");
const bcrypt=require("../../utils/bcrypt");


const userOps={
    register(req,res){
        req.user.password = bcrypt.encryptPassword(req.user.password);
        User.create(req.user, (err)=>{
            if(err){
                if(err.code==11000)res.status(500).json({"message":"Username Already Exists", "userconflict":true})
                else {
                    res.status(500).json({"message":"Error in user add", "error":err})
                }
            }
            else {
                var msg = "Hope You Score Well :)";
                    if(req.user.role=="teacher") msg = "Hope you enjoy this platform :)";
                    msg = `Hello ${req.user.username}, ` + `Thanks for registering with us as a ${req.user.role}\n` + msg; 
                    sendEmails(`Congrats, registration successful!!`,msg,`${req.user.email}`)
                res.status(200).json({"message":"User added successfully"})
            }
        })
    },
    login(req,res){
        username = req.user.username;
        password = req.user.password;
        User.findOne({username}, (err,doc)=>{
            if(err)res.status(500).json({"message":"Error in profile fetch", "error":err});
            else{
                if(doc){
                    if(bcrypt.compareHash(password, doc.password)){
                        var token = jsonWebToken.generateToken(username);
                        res.status(200).json({"message":"Login successful", "token":token})
                    }
                    else{
                        res.status(404).json({"message":"Invalid username or password"})
                    }
                }
                else{
                    res.status(404).json({"message":"Invalid username or password"})
                }
            }
        })
    },
    fetchProfile(req,res){
        if(req.token==undefined  || jsonWebToken.verifyToken(req.token)==null){
            res.status(403).json({"message":"Illegal action", "promptlogin":true})
        }
        else{
            var username = jsonWebToken.verifyToken(req.token);
            User.findOne({username}, (err,doc)=>{
                if(err)res.status(500).json({"message":"Error in profile fetch", "error":err})
                else if(doc){
                    
                    testOps.fetchAll(doc, res);
                }
                else res.status(404).json({"message":"User not found"})
            })
        }
    },
    changePassword(req,res){
        if(req.token==undefined  || jsonWebToken.verifyToken(req.token)==null){
            res.status(403).json({"message":"Illegal action", "promptlogin":true})
        }
        else{
            var username = jsonWebToken.verifyToken(req.token);
            User.findOne({username}, (err,doc)=>{
                if(err)res.status(500).json({"message":"Error in profile fetch", "error":err})
                else if(doc){
                    var newPassword = req.user.newpassword;
                    var newEmail = req.user.newemail;
                    console.log("new email",newEmail);
                    var oldPassword = req.user.oldpassword;
                    if(newEmail == undefined)newEmail= doc.email
                    if(newPassword == undefined)newPassword = oldPassword
                    if(bcrypt.compareHash(oldPassword,doc.password)){

                        User.updateOne({username},{$set:{"password":bcrypt.encryptPassword(newPassword), "email":newEmail}}, (err)=>{
                            if(err)res.status(500).json({"message":"Error in password update", "error":err})
                            else res.status(200).json({"message":"Password updated successfully"})
                        })
                    }
                    else{
                        res.status(403).json({"message":"Incorrect Password"})
                    }
                }
                else res.status(404).json({"message":"User not found"})
            })
        }
    }

}

module.exports=userOps;

