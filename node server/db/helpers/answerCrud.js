const Answer=require("../models/answerModel");
const Test=require("../models/testModel");
const User = require("../models/userModel");

const quesOps = require("./questionCrud")

const sendEmails=require("../../utils/nodemailer");
const jsonWebToken=require("../../utils/jsonwebtoken");

const answerOps={
    // async create(req,res){
    //     try{
    //         console.log(req.test.testid);
    //         console.log((typeof(quesOps)));
    //         console.log(typeof(quesOps.fetch));
    //         var question = await quesOps.fetch(req.test.testid)
    //         res.status(200).json({"ques":question})
    //     }catch(err){
    //         res.status(500).json({"err":err});
    //     }
    //     // if(req.token==undefined && jsonWebToken.verifyToken(req.token)==null){
    //     //     res.status(403).json({"message":"Illegal action", "promptlogin":true})
    //     // }
    //     // else{
    //     //     var username = jsonWebToken.verifyToken(req.token);
    //     //     Test.findOne({"_id":req.test.testid}, async(err,doc)=>{
    //     //         if(err)res.status(500).json({"message":"Error in test fetch", "error":err})
    //     //         else{
    //     //             if(doc){
    //     //                 try{
    //     //                     console.log(req.test.testid);
    //     //                     console.log(typeof(quesOps.fetch))
    //     //                     var questions = await quesOps.fetch(req.test.testid)
    //     //                     var answers = req.answers ;
    //     //                     var ansArray = [] ;
    //     //                     var scored = 0;
    //     //                     var total = 0;
    //     //                     for(ques of questions){
    //     //                         var ansObj = {
    //     //                             "username":username,
    //     //                             "testid":doc._id,
    //     //                             "questionid":ques._id,
    //     //                             "chosen":answers[ques._id]
    //     //                         }
    //     //                         if(ansObj.chosen==ques.correct){
    //     //                             scored=ques.score;
    //     //                             ansObj["score"]=ques.score;
    //     //                         }
    //     //                         else ansObj["score"]=0;
    //     //                         total+=ques.score
    //     //                         ansArray.push(ansObj)
    //     //                     }

    //     //                     User.findOne({username}, (err,profile)=>{
    //     //                         if(err)res.status(500).json({"message":"Error in user fetch", "error":err})
    //     //                         else{
    //     //                             if(profile && profile.role=="student"){
    //     //                                 Answer.insertMany(ansArray, (err)=>{
    //     //                                     if(err)res.status(500).json({"message":"Error in answers create", "error":err})
    //     //                                     else {
    //     //                                           sendEmails("Test Submitted", `Sucessfully submitted test: ${doc.name}, You've scored ${scored} out of ${total}`, profile.email)
    //     //                                           res.status(200).json({"message":"Answers submitted successfully"})
    //     //                                     }
    //     //                                 })
    //     //                             }
    //     //                             else res.status(404).json({"message":"User not found", "promptlogin":true})
    //     //                         }
    //     //                     })
                                
    //     //                 }catch(err1){
    //     //                     console.log(err1);
    //     //                     res.status(404).json({"message":"Error in questions fetch", "error":err1})
    //     //                 }
    //     //             }
    //     //             else res.status(404).json({"message":"Test not found"})
    //     //         }
    //     //     })
    //     // }

    // },
    fetch(username, test, questions, res){
        // console.log(questions);
        // res.status(200).json({"ques":questions})
        // return

        Answer.find({username:username, testid:test._id}, (err,docs)=>{
            if(err)res.status(500).json({"message":"Error in answers fetch", "error":err})
            else{
                if(docs.length>0){
                    console.log(docs);
                    questions.forEach(obj => {
                        for(ans of docs){
                            if(ans.questionid==obj._id){
                                obj["chosen"]=ans.answer;
                                obj["marks"]=ans.score;
                                break;
                            }
                        }
                    });
                    res.status(200).json({"message":"Test fetch for review successful", "test":test, "questions":questions, "answers":docs});
                }
                else{
                    for(ques of questions){
                        ques["correct"]= undefined;
                    }
                    res.status(200).json({"message":"Test fetch for attempt successful", "test":test, "questions":questions})
                }
            }
        })
    },
    refine(profile, allTests, res){
        Answer.find({username:profile.username},(err,docs)=>{
            if(err)res.status(500).json({"message":"Error in answers fetch", "error":err})
            else{
                if(docs.length>0){
                    var attempted = []
                    var unattempted = []
                    for(test of allTests){
                        var flag = false;
                        for(ans of docs){
                            if(test._id==ans.testid){
                                attempted.push(test)
                                flag=true
                                break;
                            }
                        }
                        if(flag==false)unattempted.push(test)
                    }
                    res.status(200).json({"message":"User fetch successful", "profile":profile, "unattempted":unattempted, "attempted":attempted})
                }
                else res.status(200).json({"message":"User fetch successful", "profile":profile, "unattempted":allTests, "attempted":[]})
            }
        })
    },
    delete(testid, res){
        Answer.deleteMany({testid: testid},(err)=>{
            if(err)res.status(500).json({"message":"Error in answers delete", "error":err})
            else res.status(200).json({"message":"Test deletion successful"})
        })
    }
}

module.exports = answerOps;