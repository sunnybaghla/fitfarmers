const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    userId:{
        type:String
    },
    firstName:{
        type:String,
        required:'First Name Cant be Empty'
    },
    lastName:{
        type:String,
        required:'Last Name Cant be Empty'
    },
    age:{
        type:String,
        required:'Please Enter Date of Client',
    },
    gender:{
        type:String
        // required:true,
        // enum:["Male","Female"]
    },
    mobile:{
        type:String,
        required:'Mobile number Required',
        unique:true
    },
    email:{
        type:String
    },
    adress:{
        type:String,
        required:'Adress is Required'
    },
    dateOfJoining:{
        type:Date
        // default:Date.now
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
    },
    creditAmount:{
        type:Number,
        default:0
        
    }
    
    
    
    
},{timestamps:true});
const userDetail=new mongoose.model('userDetail',userSchema);
module.exports=userDetail;