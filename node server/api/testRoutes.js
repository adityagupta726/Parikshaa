const express=require('express');
const testRoutes=express.Router();
const testOps=require('../db/helpers/testCrud');

testRoutes.post('/create',(req,res)=>{
    testOps.create(req.body,res);
})
testRoutes.post("/delete",(req,res)=>{
    testOps.delete(req.body,res);
})
testRoutes.post("/fetch",(req,res)=>{
    testOps.fetchSingle(req.body,res);
})
module.exports=testRoutes;