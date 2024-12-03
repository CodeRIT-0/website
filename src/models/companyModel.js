import mongoose from  "mongoose";

const companySchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Required"],
    },
    interviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Interview"
    }]
    ,
    imageUrl:{
        type:String,
        required:true
    }
})


const Company= mongoose.models.Company || mongoose.model("Company",companySchema);

export default Company;
