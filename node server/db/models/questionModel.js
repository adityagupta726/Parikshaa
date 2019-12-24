const connection=require("../connection");
const Schema=connection.Schema;
const questionSchema=new Schema({
    "testid":{required:true, type:String},
    "name":{type:String, required:true},
    "options":{type:Array, required:true},
    "correct":{type:String, required:true},
    "score":{type:Number, required:true, default:0}
});

questionSchema.index({ testid: 1, name: 1 }, { unique: true })

const Question=connection.model("questions",questionSchema);
module.exports=Question;