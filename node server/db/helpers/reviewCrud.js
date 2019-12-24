const User = require("../models/userModel")
const Test = require("../models/testModel")

const jsonWebToken = require("../../utils/jsonwebtoken")
const sendEmails = require("../../utils/nodemailer")

const reviewOps = {
    sendRev (req,res){
        // console.log(req)
        if(req.token==undefined  || jsonWebToken.verifyToken(req.token)==null){
            res.status(403).json({"message":"Illegal action", "promptlogin":true})
        }
        else{
            var username = jsonWebToken.verifyToken(req.token)
            Test.findOne({_id:req.test.testid}, (err,doc)=>{
                if(err)res.status(500).json({"message":"Error in test fetch", "error":err})
                else{
                    if(doc){
                        User.findOne({username:doc.username}, (err,profile)=>{
                            if(err)res.status(500).json({"message":"Error in teacher fetch", "error":err})
                            else{
                                if(profile){
                                    const review = req.review;
                                    // console.log(review)
                                    sendEmails(`Review for your test (${doc.name})`, `${username} rated your test (${doc.name}) as ${review.sentiment} and wrote:\n ${review.content}\n`, profile.email)
                                    res.status(200).json({"message":"Review sent successfully"})
                                }
                                else res.status(404).json({"message":"Teacher profile not found"})
                            }
                        })
                    }
                    else res.status(404).json({"message":"Test not found"})
                }
            })
        }
    }
}

module.exports = reviewOps;