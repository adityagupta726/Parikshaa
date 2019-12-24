const express=require('express');
const reviewRoutes=express.Router();
var revOps=require('../db/helpers/reviewCrud');

reviewRoutes.post('/send',(req,res)=>{
    revOps.sendRev(req.body,res);
})

module.exports=reviewRoutes;