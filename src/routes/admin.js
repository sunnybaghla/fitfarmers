const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const checkAdminAuth = require("../middleware/auth");
const adminModel = require("../models/admin");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(cookieParser());

// router.post("/", async (req, res) => {
//   try {
//     const body = req.body;
//     const fetchData = new adminModel(body);

//     // const fetchData=     new adminModel(req.body);
//     const userName = await adminModel.findOne({ userName: req.body.userName });
//     if (userName) {
//       res.status(400).json({
//         success: false,
//         message: "Unauthorized",
//         auth: false,
//         code: 402,
//         msg: "userExist",
//       });
//     } else {
//       const salt = await bcrypt.genSalt(10);
//       fetchData.password = await bcrypt.hash(fetchData.password, salt);
//       // console.log(fetchData.password)
//       // console.log(fetchData.password)
//       const adminData = await fetchData.save();
//       res.json({ adminData: adminData });
//     }
//   } catch (error) {
//     res.send(error);
//   }
// });
// router.get("/", async (req, res) => {
//   try {
//     const adminData = await adminModel.find();
//     res.send(adminData);
//   } catch (e) {
//     res.send(e);
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (userName && password) {
      const user = await adminModel.findOne({ userName: req.body.userName });
      if (user) {
        // const password= await adminModel.findOne({passowrd:req.body.password});
        const isPasswordMatch = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (isPasswordMatch) {
          const token = jwt.sign(
            { user_id: user._id, userName },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );
          return res.status(200).json({
            success: true,
            token: token,
            message: "login successfull",
            userName: user.userName,
            user: user,
            code: 200,
            msg: "login",
          });
        } else {
          res.json({
            success: false,
            message: "Please Enter Correct Password",
            code: 405,
            msg: "passwordIncorrect",
          });
        }
      } else {
        res.json({
          success: false,
          message: "User Not Found",
          code: 406,
          msg: "adminNotFound",
        });
      }
    } else {
      res.status(500).send({
        status: "failed",
        message: "All Field are Required",
        code: 407,
        msg: "allFieldRequired",
      });
    }
  } catch (e) {
    res.status(500).send({ code: 444, msg: "wentWrong",e:e});
  }
});
router.put("/changePassword", checkAdminAuth, async (req, res) => {
  const userName = req.userName;
  try

  {
  const user = await adminModel.findOne({ userName: userName });
    if (req.body.newPassword === req.body.confirmPassword)
     {
      const isMatched = await bcrypt.compare(req.body.password, user.password);
      console.log(isMatched)
      if (!isMatched) {
     
        res.json({success:false,msg:"existPasswordIsIncorrect"})

      }
       else{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
        try {
          await adminModel.findByIdAndUpdate(
            user._id,
            {
              $set: {
                password: hashPassword,
              },
            },
            { new: true }
          );
          res.status(200).json({
            message: "sucessfully Changed Password",
            success: true,
            code: 201,
            msg: "OkayChangePassword",
          });
        } 
        catch (e) {
          res.status(500).json({
            message: e.message,
            success: false,
            code: 444,
            msg: "wentWrong",
          });
        }

    
     
       
    }
    }
    else
    res.json({success:false,msg:"NewOldPassNotMatch"})
  } 

   
  
  catch(e)
  {
    res.status(404).json({
      success: false,
      message: "Auth Failed",
      code: 406,
      msg: "adminNotFound",
    });
  }
  
});
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
module.exports = router;
