import mongoose from "mongoose";

const { Schema } = mongoose;

  const Plan = new Schema({
    plan:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    resolution:{
        type:String,
        required:true
    },
    device:{
        type:Array,
        required:true
    },
    price:{
        type:Object,
        required:true
    },
    screen:{
        type:Number,
        required:true
    },
   date:{
       type:Date,
       default:Date.now
   }
  });
  const Plans=mongoose.model('plan',Plan);
  
  export default Plans;