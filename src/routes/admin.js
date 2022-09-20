const express=require('express');
const app=express();
const router=express.Router();
const bcrypt=require("bcrypt");
const checkAdminAuth=require("../middleware/auth");
const adminModel=require("../models/admin");
const jwt=require("jsonwebtoken");
const { cookie } = require('express/lib/response');
const { response } = require('express');
const cookieParser=require("cookie-parser");
require('dotenv').config();
app.use(cookieParser());

router.post("/",async(req,res)=>{
    try{
            const body =req.body;
            const fetchData=new adminModel(body);

        // const fetchData=     new adminModel(req.body);
        const userName= await adminModel.findOne({userName:req.body.userName})
        if(userName)
        {
            res.send("failed");

        }
        else
        {
            const salt =await bcrypt.genSalt(10);
            fetchData.password=await bcrypt.hash(fetchData.password,salt);
            // console.log(fetchData.password)
            // console.log(fetchData.password)
    const adminData=await fetchData.save();
    res.json({adminData:adminData});
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
                    const isPasswordMatch= await bcrypt.compare(req.body.password,user.password)
                    if(isPasswordMatch)
                    {
                        // res.send(user._id);
                            // console.log(user._id);
                        const token=jwt.sign({user_id:user._id,userName},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
                        // this.tokens=this.tokens.concat({token:token});
                        // await this.save().then((response)=>console.log(response)).catch((e)=>console.log(e));
                        return res.json({success:true,token:token,message:'login successfull',userName:user.userName,user:user})
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
                        res.json({success:false,message:"Please Enter Correct Password"})

                    }
            }   
            else
            {
                res.json({success:false,message:"User Not Found"})

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
router.put("/changePassword",checkAdminAuth,async(req,res)=>{
    const userName=req.userName;
    // console.log(userName);
    const body=req.body;
    //    const {password,newPassword,confirmPassword}=req.body;
       const user= await adminModel.findOne({userName:userName});
    //    console.log(user.userName+user.password);
       if(user)
       {
                // console.log(user.password,req.body.newPassword,req.userName)
            if(req.body.newPassword===req.body.confirmPassword)
            {
                // console.log(true)
                const isMatched=await bcrypt.compare(req.body.password,user.password);
                // console.log("match")
                if(isMatched)
                {
                    const salt =await bcrypt.genSalt(10);
                   const hashPassword=await bcrypt.hash(req.body.newPassword,salt);  
                    try
                    {
                    const updateData= await adminModel.findByIdAndUpdate(user._id,{
                        $set:{
                            password:hashPassword
                        }
                    },{new:true}) 
                    res.json({message:"sucessfully Changed Password",success:true})
                }
                catch(e)
                {
                    res.json({message:e.message,success:false})

                }

                }
                else
                res.json({message:"Password Not match",success:false})
            }
       }
       else
       res.json({success:false,message:"Auth Failed"})



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