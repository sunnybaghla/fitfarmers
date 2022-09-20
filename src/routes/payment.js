const express=require('express');
const router=express.Router();
const paymentModel=require("../models/payment");
const checkAdminAuth=require("../middleware/auth");
router.post("/",checkAdminAuth,async(req,res)=>{
    try{

        const fetchData=     new paymentModel(req.body);
    const paymentData=await fetchData.save();
    console.log(req.userName)
    res.json({success:true,paymentData:paymentData,message:"Payment Sucessfully Updated",userName:req.userName});
    }
    catch(error)
    {
            res.json({success:false,message:error.message});
        }

});
router.get("/",async(req,res)=>{
    try
    {
    const paymentData= await paymentModel.find();
    res.json(paymentData);
    }
    catch(e)
    {
        res.send(e);
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
            res.send(paymentsList);
    }
    catch(error)
    {
            res.send(error);
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