const express=require('express');
const router=express.Router();
const paymentModel=require("../models/payment");
const checkAdminAuth=require("../middleware/auth");
router.post("/",checkAdminAuth,async(req,res)=>{
    try{

        const fetchData=     new paymentModel(req.body);
    const paymentData=await fetchData.save();
    console.log(req.userName)
    res.status(200).json({success:true,paymentData:paymentData,message:"Payment Sucessfully Updated",userName:req.userName});
    }
    catch(error)
    {
     if(error._message=='userDetail validation failed')
        res.status(500).json({message:'all field req',success:false,msg:'validationError',code:351})
        else
        res.status(404).json({message:error.message,code:404,msg:'internalServerError'});
        }

});
router.get("/",async(req,res)=>{
    try
    {
    const paymentData= await paymentModel.find();
    if(paymentData)
    res.status(200).json({paymentData:paymentData,code:200,msg:"success",paymentData:paymentData});
    else
    res.json({msg:"noDataAvailable",code:500});

    }
    catch(e)
    {
        res.status(404).json({message:e.message,code:404,msg:'internalServerError'});
    }

});
router.get("/searchByDate",async(req,res)=>{
    try
    {
    const paymentData= await paymentModel.find({"dateOfPayment":ISODate("2022-09-19")});
    res.json(paymentData);
    }
    catch(e)
    {
        res.send(e);
    }

});
router.get("/search/:id",async(req,res)=>{
    try
    {
            const usersId= req.params.id;
            const paymentsList= await paymentModel.find({userId:usersId});
            if(paymentsList)
            res.status(200).json({paymentsList:paymentsList,code:200,msg:"paymentHistory"});
            else
            res.json({msg:"noDataAvailable",code:451});

    }
    catch(error)
    {
        res.status(404).json({message:message,code:404,msg:'internalServerError'});

    }
});
//clear payments
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
// router.put("/:id",c,async(req,res)=>{
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