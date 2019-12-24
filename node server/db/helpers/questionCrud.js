const Question = require("../models/questionModel");

const ansOps = require("./answerCrud");

const sendEmails=require("../../utils/nodemailer");

const questionOps={
    async add(profile, test, questions, res){
        // console.log("5")
        var rejected=[];
        //  quesarray.forEach((quesObject) => {
        //      var result= await quesadd(quesObject);
        //      if(result!=true)rejected.push(obj);
        //  })
        for(const quesObject of questions){
            try{
                var result = await this.addOne(quesObject)
            }catch(err){
                var errObj={
                    "error":err,
                    "question":quesObject
                }
                rejected.push(errObj);
            }
        }
        var msg="";
        if(rejected.length>0){
            msg="Here are the questions that could not be added:\n"
            for(obj of rejected){
                msg+=`${obj.question.name}     :    ${obj.error.errmsg}\n`
            }
        }
        sendEmails("Test Added", `Successfully created test '${test.name}'\n`+msg, profile.email);
        res.status(200).json({"message":"Test created and questions added","rejected":rejected})
        // console.log("7")
    },
    addOne(quesObject){
        // return new Promise((resolve, reject)=>{
        //     Question.create(quesObject,(err)=>{
        //         if(err)reject(err);
        //         else resolve();
        //     })
        // })
        // console.log("6")
        return Question.create(quesObject).then(()=>{
            return true;
        }).catch((err)=>{
            throw err;
        })
        // ,(err)=>{
        //     if(err)throw err ;
        //     else return;
        // })
    },
    fetch(testid){
        console.log(testid)
        return Question.find({testid: testid}).then((docs)=>{
            return docs;
        }).catch((err)=>{
            console.log(err)
            throw err;
        })
        // return new Promise((resolve, reject)=>{
        //     Question.find({testid},(err,docs)=>{
        //         if(err)reject(err)
        //         else resolve(docs)
        //     })
        // })
    },
    delete(testid, res){
        Question.deleteMany({testid},(err)=>{
            if(err)res.status(500).json({"message":"Error in questions delete", "error":err})
            // else res.status(200).json({"message":"Test and questions deleted successfully"})
            else ansOps.delete(testid, res);
        })
    }
}

module.exports = questionOps;

// async fetch(testid){
//  return q[]
// }


// fetchtest(req, res){
//     fetch(req.test.testid);
//     [test1,test2 ....],
//     [q1, q2, ....]
//     res.status(gvjhb).json({"msg":bhjjn, quests:[]})

// }



// c{

// }







// const Question=require('../models/questionModel');
// const quesOps={
//      create: async(quesarray,response)=>{
//         var rejected=[];
//         //  quesarray.forEach((quesObject) => {
//         //      var result= await this.quesadd(quesObject);
//         //      if(result!=true)rejected.push(quesObject);
//         //  })
//         for(const quesObject of quesarray){
//             console.log(quesObject)
//             try{
//                 var result = await this.quesadd(quesObject)
//             }catch(err){
//                 if(result["inserted"]==false)rejected.push(quesObject)
//             }
//         }
//          response.status(200).json({"message":"question added","rejected":rejected})
//         },
//         // quesObject["testid"]=testid;
//         // console.log(quesObject)});

//         // Question.insertMany(quesarray,(err)=>{
//         // //Question.create(quesObject,(err)=>{   
//         //     if(err){
//         //       if(err.code==11000) res.status(500).json({"message":"Question already exists", "questionconflict":true})
//         //       else response.status(500).json({"message":"Record not added due to error","error":err});
//         //     }
//         //     else{
//         //         console.log('record added');
//         //         response.status(200).json({"message":"record addded"});
//         //     }
//         // })       
         
    
    
      
//            quesadd:async (quesobj)=>{
//             	// return Question.create({obj})
//             	// 		.exec()
//                 //         .then(()=>{
//                 //             return true;
//                 //         })
//             	// 		.catch((error)=>{
//             	// 			return {error:error, obj:obj};
//                 // 		})
                
//                 return new Promise((resolve,reject)=>{
//                     Question.create(quesobj,(err)=>{
//                         if(err)reject({error:err, inserted:false, question:quesobj});
//                         else resolve({inserted:true});
//                     })
//                 })

//                 // await     Question.create(quesobj,(err)=>{
//                 //              if(err)reject({error:err, inserted:false, question:quesobj});
//                 //              else resolve({inserted:true});
//                 //          })

//                 // return new Promise(resolve => {
//                 //     setTimeout(resolve, 1000);
//                 //   });
//             }
    

// ,

//     delete(quesObject,response){
//        Question.findOneAndRemove(quesObject,(err)=>{
//             if(err){
//                 response.status(500).json({"message":'Record not deleted due to error',"error":err});
//             }
//             else{
//                 console.log('record deleted');
//                 response.status(200).json({"message":'record deleted'});
//             }
//         })
//     },
    
//     fetch(testid,response){
//         Question.find({"testid":testid},(err,docs)=>{
//             if(err){
//                 response.status(500).json({"message":'error in db during find operation',"error":err})
//             }
//             else{
//             if(docs){
//                 response.status(200).json({"message":"questions found",'questions':docs});
//             }
//             else{
//                 response.status(404).json({"message":"questions not found",'questions':[]});
//             }
//          } 
//         })
//     }


// }
// module.exports=quesOps;
