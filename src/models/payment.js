const mongoose=require('mongoose');
const paymentSchema=new mongoose.Schema({
    paymentId:{
        type:String
    },
    amount:{
        type:Number,
        required:true
    },
    totalCredit:{
        type:Number
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserDetail',
        // require:true
    },
    // adminId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'AdminDetail'
    // },
    dateOfPayment:{
        type:Date,
        default:Date.now()

    },
    paymentMethod:{
        type:String,
        enum:['Paytm','PhonePay','Cash','CreditCard'],
        default:'Cash'

    },
    note:{
        type:String
    }


},{timestamps:true}
);
const paymentModel= new mongoose.model('payment',paymentSchema);
module.exports=paymentModel;