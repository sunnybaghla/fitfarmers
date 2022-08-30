const mongoose=require('mongoose');
const feeSchema= mongoose.Schema({
    planType:{
        type:String,
        enum:['Month','Quaterly']
    },
    planPrice:{
        type:Number,
        require:true,
        min:1000
    }

});