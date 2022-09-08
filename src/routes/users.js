const express=require("express");
const res = require("express/lib/response");
const router=express.Router();
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
router.get("/",async(req,res)=>{
    try
    {
        const allUser= await userModel.find();
        res.send(allUser);
    }
    catch(error)
    {
        res.status(400).send(error);
    }
})
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
    stauts:req.body.stauts,
    planType:req.body.planType,
    planDuration:req.body.planDuration,
    
    fee:req.body.fee,

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

module.exports=router;