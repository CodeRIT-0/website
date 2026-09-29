import mongoose from "mongoose";

let isConnected = false;
let connectionPromise = null;

const dbConnect = async () => {
  if (isConnected) {
    return;
  }

  if (connectionPromise) {
    await connectionPromise;
    return;
  }

  const rawUri = (process.env.DB_URL || process.env.MONGODB_URI || '').trim().replace(/^[`'"]+|[`'"]+$/g, '').trim();
  if (!rawUri) {
    throw new Error('DB_URL or MONGODB_URI environment variable is not defined in .env.local');
  }
  
  let connectionString = rawUri;
  
  if (connectionString.includes('/?')) {
    connectionString = connectionString.replace('/?', '/test?');
  } else if (connectionString.includes('?')) {
    const parts = connectionString.split('?');
    connectionString = `${parts[0]}/test?${parts[1]}`;
  } else {
    connectionString = `${connectionString}/test`;
  }
  
  console.log('Connecting to database: test');
  
  connectionPromise = mongoose.connect(connectionString);

  try {
    const db = await connectionPromise;
    isConnected = !!db.connections[0].readyState;
    console.log("Database connected successfully to:", db.connections[0].name);
  } catch (error) {
    console.error("Database connection failed", error);
    connectionPromise = null;
    throw new Error("Database connection failed");
  }
};

export default dbConnect;
export const connect = dbConnect;
