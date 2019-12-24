const connection=require("../connection");
const Schema=connection.Schema;
const userSchema=new Schema({
    "username":{unique:true, required:true, type:String, index:{unique:true}},
    "password":{required:true, type:String},
    "email":{required:true, type:String},
    "role":{required:true, type:String, default:"student", enum: ['teacher', 'student']}
});
const User=connection.model("users",userSchema);
module.exports=User;