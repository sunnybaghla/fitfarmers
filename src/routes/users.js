const express=require("express");
const router=express.Router();
const userModel=require('../models/users');
router.post("/",async(req,res)=>{
    const newUser=new userModel(req.body);
    try
    {
            const savedUser=await newUser.save();
            res.send(savedUser);
            console.log(savedUser);
    }
    catch(error)
    {
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
        res.send(error);
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
    catch{
        res.send(500).json(error);
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
            {adress:{$regex:req.params.key}}
        ]
    });
    res.send(data);
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
    stauts:req.body.status,
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
    res.status(404).send(e);
}
})

module.exports=router;