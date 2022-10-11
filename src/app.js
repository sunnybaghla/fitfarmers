const express=require("express");
const mongoose=require('mongoose');
const app=express();
const http=require('http');
const https=require('https');
const userRoute=require('./routes/users');
const paymentRoute=require('./routes/payment');
const paymentModel = require("./models/payment");
const userHistory=require("./routes/userHistory");
const adminRoute=require("./routes/admin");
const port=process.env.PORT || 8000;
const cors=require('cors');
const cookieParser=require("cookie-parser");
const checkAdminAuth=require("./middleware/auth");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const fs=require("fs");


const bodyParser = require('body-parser');
const islogin = require("./middleware/islogin");
app.use(bodyParser.json())
require('dotenv').config();
const options={
    key:fs.readFileSync("server.key"),
    cert:fs.readFileSync("server.cert")
}

mongoose.connect('mongodb+srv://sahil:sahil@cluster0.gedx4a7.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log('db connected');
}).catch((e)=>{
    console.log(e);
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/admin",adminRoute);
app.use("/user",userRoute);
app.use("/payment",paymentRoute);
app.use('/userHistory',userHistory);
app.use('/islogin',islogin)
// app.ge"t("/",(req,res)=>{
//     res.send("hello from get side");
// })
app.get("/cookie",(req,res)=>{
    res.cookie('local cookie',"adadada");
    res.send("cookie send");
});
app.get('/*', function(req, res){
    res.status(404).send('what???');
  });
  const httpsServer=https.createServer(options,app);
  
    app.listen(port,()=>{
        console.log("server is running");
    })
