import mongoose, { mongo } from  "mongoose";

const InterviewSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    year:{
        type:Number,
        required:[true,"year is requried"]
    },
    role:{
        type:String,
        required:true,
    }
    ,
    company:{
        type:String,
        required:true,
    },
    experience:{
        type:String,
        required:true,
    }
   
})


const Interview= mongoose.models.Interview || mongoose.model("Interview",InterviewSchema);

export default Interview;
