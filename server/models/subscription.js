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
    durationType:{
        type:String,
        required:true
    },
    paymentIntent:{
        type:Object,
        default:{status:"Incomplete transaction"}
    },
   date:{
       type:Date,
       default:Date.now
   }
  },{timestamps:true});
  const Subscriptions=mongoose.model('subscription',Subscription);
  
  export default Subscriptions;