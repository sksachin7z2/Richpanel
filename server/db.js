import mongoose from "mongoose";

const connectToMongo=async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/richpaneltest');
    console.log("mongo connected");

}

export default connectToMongo