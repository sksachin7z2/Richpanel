import mongoose from "mongoose";

const { Schema } = mongoose;

  const Plan = new Schema({
    plan:{
        type:String,
        required:true
    },
    video:{
        type:Object,
        required:true
    },
    resolution:{
        type:Object,
        required:true
    },
    device:{
        type:Object,
        required:true
    },
    price:{
        type:Object,
        required:true
    },

   date:{
       type:Date,
       default:Date.now
   }
  });
  const User=mongoose.model('plan',Plan);
  
  module.exports=User;