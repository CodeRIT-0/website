require('dotenv').config();
import mongoose from  "mongoose";
const mongoURI = process.env.DB_URL;

export async function connect(){
    try{
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDB connected beautifully");
        })
        connection.on('error',(err)=>{
            process.exit();
        })
    }
    catch(err){
        console.log("Something has gone wrong");
    }
}
