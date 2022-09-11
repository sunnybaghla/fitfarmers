const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    userId:{
        type:String
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    gender:{
        type:String
        // required:true,
        // enum:["Male","Female"]
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String
    },
    adress:{
        type:String,
        required:true
    },
    dateOfJoining:{
        type:Date,
        default:Date.now
    },
    dateOfEnding:{
        type:Date
    },
    stauts:{
            type:String,
            default:'Active'    
    },
    planType:{
        type:String,
        enum:['Monthly','Quterly','Half Year','Year']
        
    },
    excerciseType:{
        type:String,
        enum:['Cardio','Aerobics','Gym','Gym with Cardio']
    },
    totalAmount:{
        type:Number,
        min:800
    },
    pendingAmount:{
        type:Number
    }
    
    
    
    
},{timestamps:true});
const userDetail=new mongoose.model('userDetail',userSchema);
module.exports=userDetail;