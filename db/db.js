import mongoose from "mongoose";

const connectToMongoDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://kevianto:Kevianto@kevian-cluster.dxidl.mongodb.net/login?retryWrites=true&w=majority&appName=Kevian-cluster");
        console.log("Connected to MongoDB");

    }
    catch (error){
        console.log("Error connecting to MongoDB",  error.message);
    }
    
};
export default connectToMongoDB;