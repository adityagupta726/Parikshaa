const express=require('express');
const userRoutes=express.Router();
var userOps=require('../db/helpers/usercrud');

userRoutes.post('/register',(req,res)=>
{
    userOps.register(req.body,res);
})
userRoutes.post('/login',(req,res)=>
{
    userOps.login(req.body,res);
   
})
userRoutes.post('/fetch',(req,res)=>
{   
    userOps.fetchProfile(req.body,res);
})
userRoutes.post('/update',(req,res)=>{
    userOps.changePassword(req.body,res);
})
module.exports=userRoutes;