const connection=require("../connection");
const Schema=connection.Schema;
const answerSchema=new Schema({
    "username":{unique:true, required:true, type:String},
    "testid":{required:true, type:String},
    "questionid":{required:true, type:String},
    "chosen":{type:String},
    "score":{required:true, type:Number, default: 0},
});

answerSchema.index({ username: 1, questionid: 1 }, { unique: true })

const Answer=connection.model("answers",answerSchema);
module.exports=Answer;