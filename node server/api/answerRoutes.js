const express=require('express');
const answerRoutes=express.Router();
var ansOps=require('../db/helpers/answerCrud1');

answerRoutes.post('/create',(req,res)=>{
    ansOps.create(req.body,res);
})

module.exports=answerRoutes;