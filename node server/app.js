const express=require("express");
const app=express();
const bodyParser=require("body-parser");

app.use(require("./utils/cors"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/user",require("./api/userRoutes"));
app.use("/test",require("./api/testRoutes"));
// app.use("/question",require("./api/questionRoutes"));
app.use("/answer",require("./api/answerRoutes"));
app.use("/review",require("./api/reviewRoutes"));

app.listen(process.env.PORT||1234,(err)=>{
    if(err){
        console.log("Can't start server");
    }
    else {
        console.log("Server start @1234");
    }
});