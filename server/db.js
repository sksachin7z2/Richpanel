import mongoose from "mongoose";
import {initiateplans} from "./controller/plancontroller.js";
import dotenv from 'dotenv'
dotenv.config()
const connectToMongo=async()=>{
    await mongoose.connect(`mongodb+srv://sksachin7z2:${process.env.MONGO_PASSWORD}@cluster0.hlrymf6.mongodb.net/richpanel?retryWrites=true&w=majority`);
    console.log("mongo connected");
    initiateplans();
}

export default connectToMongo