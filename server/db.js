import mongoose from "mongoose";
import {initiateplans} from "./controller/plancontroller.js";
const connectToMongo=async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/richpaneltest');
    console.log("mongo connected");
    initiateplans();
}

export default connectToMongo