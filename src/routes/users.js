const express=require("express");
const res = require("express/lib/response");
const { set } = require("mongoose");
const router=express.Router();
const checkAdminAuth=require("../middleware/auth")
const userModel=require('../models/users');
router.post("/",async(req,res)=>{
    const newUser=new userModel(req.body);
    try
    {
            const savedUser=await newUser.save();
            res.status(200).send(savedUser);
            console.log(savedUser);
    }
    catch(error)
    {
        // res.status(400).send(error.status+error)
        res.send(error)
        console.log(error);
    }
});
router.get("/",checkAdminAuth,async(req,res)=>{
    try
    {
        console.log("req.cookies.fitFarmers");
        const allUser= await userModel.find();
        res.send(allUser);
    }
    catch(error)
    {
        res.status(400).send(error);
    }
})
router.get("/pendingAmountUser",async(req,res)=>{
    try
    {
        // const creditAmount2= await userModel.find(totalAmount);
        // res.send(creditAmount2)
        const data= await userModel.find({$expr:{$gt:["$totalAmount","$creditAmount"]}});

        console.log(data);
        res.send(data);
    }
    catch(e)
    {
        res.send(e);
    }
});
router.get("/paidAmountUser",async(req,res)=>{
    try
    {
        // const creditAmount2= await userModel.find(totalAmount);
        // res.send(creditAmount2)
        const data= await userModel.find({$expr:{$eq:["$totalAmount","$creditAmount"]}});

        console.log(data);
        res.send(data);
    }
    catch(e)
    {
        res.send(e);
    }
});

///search by id
router.get("/:id",async(req,res)=>{
    try
    {
        const _id=req.params.id;
            const userList=await userModel.findById(_id);
            res.status(200).json(userList);

    }
    catch(error){
        // res.send(400).json(error);
        console.log(error);

    }
});
//search by anthing you want
router.get("/search/:key",async(req,res)=>{
    let data=await userModel.find({
        "$or":[
            {firstName:{$regex:req.params.key}},
            {mobile:{$regex:req.params.key}},
            {lastName:{$regex:req.params.key}},
            {adress:{$regex:req.params.key}},
            {stauts:req.params.key}
        ]
    });
    res.send(data);
});

router.get("/search/stauts/:key",async(req,res)=>{
    try
    {
    let data =await userModel.find({
        stauts:req.params.key
    },(error,data)=>{
        if(error)
        {
            console.log(error.message);
        }
        if(data)
        {
            res.send(data)
        }
    });
    console.log(data);
    res.send(data);
}
catch(e)
{
    res.send(e);
    console.log(e);
}
})
router.put("/:id",async(req,res)=>{
    const _id=req.params.id;
    try{
    const updateData=await userModel.findByIdAndUpdate(_id,{
        $set:{
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    age:req.body.age,
    gender:req.body.gender,
    mobile:req.body.mobile,
    adress:req.body.adress,
    dateOfJoining:req.body.dateOfJoining,
    dateOfEnding:req.body.dateOfEnding,
    stauts:req.body.stauts,
    excerciseType:req.body.excerciseType,
    planType:req.body.planType,
    // totalAmount:req.body.totalAmount
    // totalAmount:req.body.totalAmount

    
    totalAmount:req.body.totalAmount,
    // pendingAmount:req.body.pendingAmount,
    creditAmount:req.body.creditAmount

        }
    },{
        new:true
    });
    res.status(200).json(updateData);
}
catch(e)
{
    res.status(400).send(e.message);
}
})
router.get("/filter2/",async(req,res)=>{
    try
    {
            const data=await userModel.find({creditAmount:{$gte:100}});
            console.log(data);
            res.send(data);
        }
    catch(e)
    {
        res.send(e);
    }
});

module.exports=router;