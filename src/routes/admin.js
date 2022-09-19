const express=require('express');
const app=express();
const router=express.Router();
const adminModel=require("../models/admin");
const jwt=require("jsonwebtoken");
const { cookie } = require('express/lib/response');
const { response } = require('express');
const cookieParser=require("cookie-parser");
require('dotenv').config();
app.use(cookieParser());

router.post("/",async(req,res)=>{
    try{

        const fetchData=     new adminModel(req.body);
        const userName= await adminModel.findOne({userName:req.body.userName})
        if(userName)
        {
            res.send("failed");

        }
        else
        {
    const adminData=await fetchData.save();
    res.send(adminData);
        }
    }
    catch(error)
    {
            res.send(error);
        }

});
router.get("/",async(req,res)=>{
    try
    {
    const adminData= await adminModel.find();
    res.send(adminData);
    }
    catch(e)
    {
        res.send(e);
    }

});
router.get("/logintemp",(req,res)=>{
    const token=  jwt.sign({user_id:"123456"},process.env.JWT_SECRET_KEY,{expiresIn:'120s'});
    // res.send("faf");

    res.cookie("fitFarmers",token);
    res.send("cookie set");
    console.log(cookie)
})
router.post("/login",async(req,res)=>{
    try
    {
        const {userName,password}=req.body;
        if(userName&&password)
        {
            const user=await adminModel.findOne({userName:req.body.userName});
            if(user)
            {
                    // const password= await adminModel.findOne({passowrd:req.body.password});
                    if(user.password==req.body.password)
                    {
                        // res.send(user._id);
                            console.log(user._id);
                        const token=jwt.sign({user_id:user._id,userName},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
                        // this.tokens=this.tokens.concat({token:token});
                        // await this.save().then((response)=>console.log(response)).catch((e)=>console.log(e));
                        return res.json({success:true,token:token,message:'login successfull'})
                    //     res.cookie("fitFarmers2",token,{
                    //     domain:"http://localhost:4200/login"
                    //   });
                        // console.log(token);
                        // console.log(cookie);

                        // .then((response)=>{
                        // res.send(response)
                        // }).catch((e)=>{res.send(e)})
                        // user.token=token
                        // res.send(user);
                        // console.log(user)
                    }
                    else
                    {
                        res.send("password not match")
                    }
            }   
            else
            {
                res.send("user not found");
            }
        }
        else
        {
            res.send( {"status":"failed","message":"All Field are Required"});
        }
    }
    catch(e)
    {
        res.send(e);
    }
})
// router.get("/search/:id",async(req,res)=>{
//     try
//     {
//             const usersId= req.params.id;
//             const paymentsList= await paymentModel.find({userId:usersId});
//             res.send(paymentsList);
//     }
//     catch(error)
//     {
//             res.send(error);
//     }
// });
// //clear payments
// router.delete("/search/:id",async(req,res)=>{
//     try
//     {
//     const usersId= req.params.id;
//     const paymentdel= await paymentModel.deleteMany({userId:usersId});
//     res.send(paymentdel);
//     }
//     catch(e)
//     {
//         res.send(e);
//     }
// })
// router.put("/:id",async(req,res)=>{
//     const _id=req.params.id;
//     try
//     {
            
//     const updateData=await paymentModel.findByIdAndUpdate(_id,{
//         $set:{

//             amount:req.body.amount,
//             userId:req.body.userId,
//             paymentMethod:req.body.paymentMethod,
//             note:req.body.note
//         }
//     },{new:true});
//     res.send(updateData);
// }
// catch(error)
// {
//     res.send(error);
// }

// });
module.exports=router;