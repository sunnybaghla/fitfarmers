const express=require("express");
const res = require("express/lib/response");
const { set } = require("mongoose");
const router=express.Router();
const checkAdminAuth=require("../middleware/auth")
const userModel=require('../models/users');
router.post("/",checkAdminAuth,async(req,res)=>{
    const newUser=new userModel(req.body);
    try
    {
            const savedUser=await newUser.save();
            res.json({message:"sucessfully Created",success:true,savedUser:savedUser,code:200,msg:'clientCreated'});
            console.log(savedUser);
        }
        catch(error)
        {
            if(error.code===11000)
            {
                    res.status(500).json({message:"Mobile Number Already Registred",success:false,code:461,msg:'dupicateMobile'})
            }
            // res.status(400).send(error.status+error)
          else if(error._message=='userDetail validation failed')
            res.status(500).json({message:'all field req',success:false,msg:'validationError',code:351})
            else
            res.status(404).json({message:e.message,code:404,msg:'internalServerError'});


            // console.log(error.code)
            // console.log(e.message)
            // console.log(error)
            
        }
    });
    router.get("/",checkAdminAuth,async(req,res)=>{
        try
        {
            
            // if(req.userName)
            // {
                
                // }
                // console.log(req.userName);
                // console.log("req.cookies.fitFarmers");
                // console.log('user Name is '+req.userName);
                const allUser= await userModel.find();
                if(allUser)
                res.json({success:true,allUser:allUser,msg:'success',code:200});
                // res.send(allUser);
                else
                res.json({msg:'noDataAvailable',code:462});

            }
            catch(error)
            {
            // console.log(error)
            res.status(404).json({message:e.message,code:404,msg:'internalServerError'});

        // res.json({message:"Cant Load Data",success:false,error:error.code});
        // res.status(400).send(error);
    }
})
router.get("/pendingAmountUser",checkAdminAuth,async(req,res)=>{
    try
    {
        // const creditAmount2= await userModel.find(totalAmount);
        // res.send(creditAmount2)
        const data= await userModel.find({$expr:{$gt:["$totalAmount","$creditAmount"]}});

        // console.log(data);
        if(data)
        res.status(200).json({data:data,code:200,msg:'pendingAmountUserFetched'});
        else
        res.json({msg:'noDataAvailable',code:522 })
    }
    catch(e)
    {
        res.status(404).json({message:e.message,code:404,msg:'internalServerError'});
        
        
    }
});
router.get("/paidAmountUser",checkAdminAuth,async(req,res)=>{
    try
    {
        // const creditAmount2= await userModel.find(totalAmount);
        // res.send(creditAmount2)
        const data= await userModel.find({$expr:{$eq:["$totalAmount","$creditAmount"]}});
        if(data)
        res.status(200).json({data:data,code:200,msg:'pendingAmountUserFetched'});
        
        else
        res.json({msg:'noDataAvailable',code:500 })
        // console.log(data);

    }
    catch(e)
    {
        res.status(404).json({message:e.message,code:404,msg:'internalServerError'});
        
    }
});

///search by id
router.get("/isLogin",checkAdminAuth,(req,res)=>{
    const userName=req.userName;
     res.json({userName:userName})

})

router.get("/:id",checkAdminAuth,async(req,res)=>{
    try
    {
        const _id=req.params.id;
        try
        {
            const userList=await userModel.findById(_id);
        
            res.status(200).json({userList:userList,userName:req.userName,msg:"okayUserById",code:200});
        }
        catch(e)
        {
            res.json({msg:'noDataAvailable',code:500})
        }
        }
        catch(error){
            // res.send(400).json(error);
            res.status(404).json({message:e.message,code:404,msg:'internalServerError'});
        // console.log(error);

    }
});
//search by anthing you want
router.get("/search/:key",checkAdminAuth,async(req,res)=>{
    let data=await userModel.find({
        "$or":[
            {firstName:{$regex:req.params.key}},
            {mobile:{$regex:req.params.key}},
            {lastName:{$regex:req.params.key}},
            {adress:{$regex:req.params.key}},
            {stauts:req.params.key}
        ]
    });
    try
    {
    if(data)
    {
        res.status(200).json({data:data,success:true,msg:'success',code:200})
    }
    else
    res.json({success:false,message:'There is No Data',code:500,msg:"noDataAvailable"})
}
catch(e) 
{
    res.status(404).json({code:404,msg:'internalServerError'})
}
    // res.send(data);
});

router.get("/search/stauts/:key",checkAdminAuth,async(req,res)=>{
    try
    {
    let data =await userModel.find({
        stauts:req.params.key
    });
    if(data)
    {
        res.status(200).json({data:data,msg:'success',code:200});
        
    }
    else
    res.json({msg:'noDataAvailable',code:500});

}
catch(e)
{
            res.status(404).json({msg:"internalServerError",code:404})
    }
})
router.put("/:id",checkAdminAuth,async(req,res)=>{
    const _id=req.params.id;
    try{
    const updateData=await userModel.findByIdAndUpdate(_id,{
        $set:{
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    age:req.body.age,
    gender:req.body.gender,
    // mobile:req.body.mobile,
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
    res.status(200).json({updateData:updateData,message:"Sucessfully Update User",success:true,code:200,msg:'success'});
}
catch(e)
{
    if(e.code==11000)
    {

        res.status(500).json({message:"Mobile No Already Registerd",success:false,code:561,msg:"duplicateMobile"});
    }
   else res.status(404).json({message:e.message,success:false,code:404,msg:'internalServerError'});
}
})
router.get("/filter2/",checkAdminAuth,async(req,res)=>{
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
router.get('*',(req,res)=>{
    res.send('error');
})

module.exports=router;