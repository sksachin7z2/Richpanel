import mongoose from "mongoose";

const { Schema } = mongoose;

  const Subscription = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    plan:{
        type:String,
        required:true
    },
    durationtype:{
        type:String,
        required:true
    },
   date:{
       type:Date,
       default:Date.now
   }
  },{timestamps:true});
  const User=mongoose.model('subscription',Subscription);
  
  module.exports=User;