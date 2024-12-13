require('dotenv').config();
import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
  if (isConnected) {
    console.log("Database is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = !!db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    throw new Error("Database connection failed");
  }
}
// require('dotenv').config();
// import mongoose from  "mongoose";
// const mongoURI = process.env.DB_URL;

// export async function connect(){
//     try{
//         await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         const connection=mongoose.connection;
//         connection.on('connected',()=>{
//             console.log("MongoDB connected beautifully");
//         })
//         connection.on('error',(err)=>{
//             process.exit();
//         })
//     }
//     catch(err){
//         console.log("Something has gone wrong");
//     }
// }
