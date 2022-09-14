const mongoose =require("mongoose");
const userHistorySchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userDetail'
    },
    dateOfJoining:{
        type:Date,
        default:Date.now
    },
    dateOfEnding:{
        type:Date
    },

    planType:{
        type:String,
        // enum:['Monthly','Quterly','Half Year','Year',]
        
    },
    excerciseType:{
        type:String,
        // enum:['Cardio','Aerobics','Gym','Gym with Cardio']
    },
    totalAmount:{
        type:Number,
        min:800
    },
    pendingAmount:{
        type:Number
    },
    remark:{
        type:String
    },
    planCompleted:{
        type:String

    },
    creditAmount:{
        type:Number
    }


});
const userHistoryModel=new mongoose.model('userHistory',userHistorySchema);
module.exports=userHistoryModel;