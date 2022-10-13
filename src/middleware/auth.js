const jwt=require("jsonwebtoken");
const adminModel=require("../models/admin");

// checkAdminAuth=async(req,res,next)=>{
//     const token =req.body.token || req.query.token||req.headers["x-access-token"]||req.cookies.fitFarmers;
//     if(token)
//     {
//         const decodeToken =jwt.verify(token,process.env.JWT_SECRET_KEY);
//         req.user=decodeToken
//         req.userName=decodeToken.userName;
//         console.log(userName)
//         return next();
//     }
//     if(!token)
//     {
//         res.send({"message":"no token found"})
//     }
//     // const {authorization}=req.headers
//     // if(authorization)
//     // {
//     //     // console.log(authorization);
//     //         try
//     //         {
//     //             token =authorization.split(' ')[1]
//     //             // console.log(token);
//     //             //verify toekn
//     //             // console.log(process.env.JWT_SECRET_KEY);
//     //             try
//     //             {

//     //                 userId=jwt.verify(token,process.env.JWT_SECRET_KEY);
//     //                 console.log(userId)
//     //             }
//     //             catch(e)
//     //             {
//     //                 console.log(e);
//     //             }
//     //             console.log(userId)
//     //             req.user=await adminModel.findById(userId);
//     //             console.log('user is'+req.user._id);
//     //             next();
//     //         }
//     //         catch(error)
//     //         {
//     //             res.status("error");
//     //             console.log(error)
//     //         }
//     //         if(!token)
//     //         {
//     //             console.log("not found token");
//     //         }
//     // }
    
// }
module.exports=async(req,res,next)=>{
    try{

    
    const token= req.headers.authorization.split(' ')[1];
    const decode=await jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.userName=decode.userName;
    // res.json({success:true,message:"Login Success",auth:true})
    // console.log(decode.userName)
      next();
    }
    catch(e)
    {
      console.log(e)
        res.status(401).json({success:false,message:"Unauthorized",auth:false,code:401,msg:"unauthorized"})
    }
}
// module.exports=checkAdminAuth;