const connection=require("../connection");
const Schema=connection.Schema;
const testSchema=new Schema({
    "username":{required:true, type:String},
    "name":{type:String, required:true},
    "duration":{type:Number, required:true, default:3600},
    "category":{type:Array}
});

testSchema.index({ username: 1, name: 1 }, { unique: true })

const Test=connection.model("tests",testSchema);
module.exports=Test;