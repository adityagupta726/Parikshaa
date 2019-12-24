const User=require("../models/userModel");
const Test=require("../models/testModel");

const quesOps = require("./questionCrud");
const ansOps = require("./answerCrud");

const jsonWebToken=require("../../utils/jsonwebtoken");

const testOps = {
    create(req,res){
        if(req.token==undefined  || jsonWebToken.verifyToken(req.token)==null){
            res.status(403).json({"message":"Illegal action", "promptlogin":true})
        }
        else{
            // console.log("1")
            var username = jsonWebToken.verifyToken(req.token);
            User.findOne({username}, (err,doc)=>{
                if(err)res.status(500).json({"message":"Error in user fetch", "error":err})
                else{
                    if(doc.role=="teacher"){
                        // console.log("2")
                        var test = req.test;
                        test["username"]=username;
                        // console.log(test)
                        Test.create(test, (error)=>{
                            if(error){
                                if(error.code==11000) res.status(500).json({"message":"Test already exists", "testconflict":true})
                                else res.status(500).json({"message":"Error in test create", "error":error})
                            }
                            else {
                                // console.log("created")
                                // sendEmails(`Test Created Successfully`,`You've successfully created the test: ${req.test.name}`,`${doc.username}`)
                                Test.findOne({username:username, name:req.test.name},(err1, testdoc)=>{
                                    if(err1)res.status(500).json({"message":"Error in test fetch", "error":err1})
                                    else {
                                        if(testdoc){
                                            // console.log("3")
                                            var testid = testdoc._id;
                                            
                                            var questions = req.questions;
                                            questions.forEach(quesObj => {
                                                quesObj["testid"] = testid
                                            });
                                            // console.log("4")
                                            quesOps.add(doc, testdoc, questions, res);
                                        }
                                    }
                                })
                                
                                
                                // res.status(200).json({"message":"Test added successfully"})
                            }
                        })
                    }
                    else res.status(404).json({"message":"Teacher not found", "promptlogin":true})
                }
            })
        }
    },
    delete(req,res){
        if(req.token==undefined  || jsonWebToken.verifyToken(req.token)==null){
            res.status(403).json({"message":"Illegal action", "promptlogin":true})
        }
        else{
            var username=jsonWebToken.verifyToken(req.token);
            // console.log(username,"   ",req.test.testid)
            Test.findOne({"_id":req.test.testid},(err,doc)=>{
                if(err)res.status(500).json({"message":"Error in User fetch", "error":err})
                else {
                    // console.log(doc.username)
                    if(doc && doc.username==username){
                        Test.deleteOne({_id:req.test.testid}, (err)=>{
                            if(err)res.status(500).json({"message":"Error in test delete", "error":err})
                            else quesOps.delete(doc._id,res);
                        })
                    }
                    else res.status(405).json({"message":"Illegal test delete"})
                }
            })
        }
    },
    fetchAll(profile, res){
        if(profile.role=='teacher'){
            Test.find({username:profile.username}, (err,docs)=>{
                if(err)res.status(500).json({"message":"Error in tests fetch", "error":err})
                else {
                    res.status(200).json({"message":"User fetch successful", "profile":profile, "tests":docs})
                }
            })
        }
        else{
            Test.find({}, (err,docs)=>{
                if(err)res.status(500).json({"message":"Error in tests fetch", "error":err})
                else {
                    if(docs.length>0){
                        ansOps.refine(profile, docs, res);
                    }
                    else res.status(200).json({"message":"User fetch successful", "profile":profile, "attempted":[], "unattempted":[]})
                }
            })
        }
    },
    async fetchSingle(req, res){
        if(req.token==undefined  || jsonWebToken.verifyToken(req.token)==null){
            res.status(403).json({"message":"Illegal action", "promptlogin":true})
        }
        else{
            var username=jsonWebToken.verifyToken(req.token);
            Test.findOne({_id:req.test.testid}, (err,testdoc)=>{
                if(err)res.status(500).json({"message":"Error in test fetch", "error":err})
                else {
                    if(testdoc){
                        User.findOne({username}, async(err,doc)=>{
                            if(err)res.status(500).json({"message":"Error in user fetch", "error":err})
                            else if(doc){
                                try{
                                    console.log(typeof(quesOps.fetch))
                                    var questions = await quesOps.fetch(req.test.testid)
                                    if(doc.role=="teacher"){
                                        if(testdoc.username==username)res.status(200).json({"message":"Test fetched successfully", "test":testdoc, "questions":questions})
                                        else res.status(403).json({"message":"Test not available"})
                                    }
                                    else{
                                        ansOps.fetch(username, testdoc, questions, res);
                                    }
                                }catch(err){
                                    res.status(503).json({"message":"Error in tests fetch", "error":err})
                                }
                            }
                            else res.status(403).json({"message":"Illegal test fetch", "promptlogin":true})
                        })
                    }
                    else res.status(404).json({"message":"Test not found"})
                }
            })
        }
    }
}

module.exports = testOps;





// const User=require("../models/userModel");
// const Test=require("../models/testModel");
// const quesOps = require("./questionCrud");
// const sendEmails=require("../../utils/nodeMailer");
// const jsonWebToken=require('../../utils/jsonwebtoken');
// const testOps={ 
   
//     create(req,res){
//         if(req.token==undefined  || jsonWebToken.verifyToken(req.token)==null){
           
//             res.status(403).json({"message":"Illegal action", "promptlogin":true})
//         }
//         else{
//             var username = jsonWebToken.verifyToken(req.token);
//             //console.log(req.token);
//             User.findOne({username}, (err,doc)=>{
//                 if(err)
//                 {
//                     res.status(500).json({"message":"Error in user fetch", "error":err})
//                 }
//                 else{
//                     if(doc.role=="teacher"){
//                         var test = req.test;
//                         console.log(req.test);
//                         Test.create(test,(error)=>{
//                             if(error){
//                                 if(error.code==11000) res.status(500).json({"message":"Test already exists", "testconflict":true})
//                                 else res.status(500).json({"message":"Error in test create","error":error})
//                             }
//                             else {
//                                sendEmails(`Test Created Successfully`,`You've successfully created the test: ${req.test.name}`,`${doc.email}`)
//                                 Test.findOne({username, name:req.test.name},(err1, testdoc)=>{
//                                     if(err1)res.status(500).json({"message":"Error in test fetch", "error":err1})
//                                     else {
//                                         if(testdoc){
//                                             var testid = testdoc._id;
//                                             console.log(testid);
//                                           //  quesOps.create(req.ques,testid,res);
//                                             var quesarray=req.questions;
//                                             quesarray.forEach(quesObject => {
//                                               quesObject["testid"]=testid;
//                                               console.log(quesObject);
//                                             });
//                                             console.log(quesarray);
//                                             quesOps.create(quesarray,res);
//                                         }
//                                     }
//                                 })
//                                  res.status(200).json({"message":"Test added successfully"})
//                             }
//                         })
//                     }
//                     else res.status(404).json({"message":"Teacher not found", "promptlogin":true})
//                 }
//             })
//         }
//     },
 
//     delete(req,res){
//          if(req.token==undefined || jsonWebToken.verifyToken(req.token)==null){
//         res.status(403).json({"message":"Illegal action", "promptlogin":true})
//     }
//     else{
//         var username = jsonWebToken.verifyToken(req.token);
//         User.findOne({username}, (err,doc)=>{
//             if(err)
//             {
//                 res.status(500).json({"message":"Error in user fetch", "error":err})
//             }
//             else{
//                 if(doc.role=="teacher"){
//                     var test = req.test;
//                     Test.findOne({username, name:req.test.name},(err1, testdoc)=>{
//                         if(err1)res.status(500).json({"message":"Error in test fetch", "error":err1})
//                         else {
//                             if(testdoc){
//                                  var testid = testdoc._id;
//                                 //quesOps.delete(req.ques,testid,res);
//                                 var quesarray=req.questions;
//                                 quesarray.forEach(quesObject => {
//                                 quesObject["testid"]=testid;
//                                 quesOps.delete(quesObject,res);
//                                 });
//                             }
//                         }
//                     })
//                     Test.findOneAndRemove({test},(error)=>{
//                         if(error){
//                   res.status(500).json({"message":"Error in test delete", "error":error})
//                         }
//                         else {
                            
//                            //sendEmails(`Test Deleted Successfully`,`You've successfully deleted the test: ${req.test.name}`,`${doc.email}`)
//                              res.status(200).json({"message":"Test deleted successfully"})
//                         }
//                     })
//                 }
//                 else res.status(404).json({"message":"Teacher not found", "promptlogin":true})
//             }
//         })
//     }
// },

//     fetch(data,response){
//         var profile = data.profile;
//         if(profile.role=='teacher'){
//            Test.find({"username":profile.username},(err,docs)=>{
//             if(err){
//                 response.status(500).json({"message":'error in db during find operation',"error":err})
//             }
//             else{
//                 if(docs){
//                     docs.forEach(doc=>{
//                        var testid= doc._id;
//                        quesops.fetch(testid,response);
//                        })

//                      response.status(200).json({tests:docs});
                     
//                 }
//                 else{
//                     response.status(404).json({"message":'No Record Found'});
//                 }}
//            })
//          }
//          else if(profile.role=='student'){
//              Test.find({},(err1,studdocs)=>{
//                  if(err1){
//                     response.status(500).json({"message":'error in db during find operation',"error":err1})
//                  }
//                  else{
//                   if(studdocs){
//                     response.status(200).json({tests:studdocs});
//                   }
//                   else{
//                     response.status(404).json({"message":'No Record Found'}); 
//                   }
                  
//                  }
//              })

//          }
       

//     }}
// module.exports=testOps;