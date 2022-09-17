const mongosee=require('mongoose');

const adminSchema=new mongosee.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
        // required:true

    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    // password:{
    //     type:String,
    //     required:true
    // }
});
const adminModel=new mongosee.model('admin',adminSchema);
module.exports=adminModel;