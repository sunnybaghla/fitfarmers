const express=require("express");
const mongoose=require('mongoose');
const app=express();
const userRoute=require('./routes/users');
const patmentRoute=require('./routes/payment');
const paymentModel = require("./models/payment");
const userHistory=require("./routes/userHistory");
const adminRoute=require("./routes/admin");
const port=process.env.PORT || 8000;
const cors=require('cors');
const cookieParser=require("cookie-parser");
const checkAdminAuth=require("./middleware/auth");
const jwt=require("jsonwebtoken");

const bodyParser = require('body-parser');
app.use(bodyParser.json())
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('db connected');
}).catch((e)=>{
    console.log(e);
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/admin",adminRoute);
app.use("/user",checkAdminAuth,userRoute);
app.use("/payment",patmentRoute);
app.use('/userHistory',userHistory);
// app.ge"t("/",(req,res)=>{
//     res.send("hello from get side");
// })
app.get("/cookie",(req,res)=>{
    res.cookie('local cookie',"adadada");
    res.send("cookie send");
});
    app.listen(port,()=>{
        console.log("server is running");
    });
