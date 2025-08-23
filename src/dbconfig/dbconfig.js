require('dotenv').config();
import mongoose from "mongoose";

// Track connection state
let isConnected = false;

// Cache the connection promise to prevent multiple connection attempts
let connectionPromise = null;

export async function connect() {
  // If already connected, return immediately
  if (isConnected) {
    return;
  }

  // If connection is in progress, wait for it to complete
  if (connectionPromise) {
    await connectionPromise;
    return;
  }

  // Start a new connection attempt
  if (!process.env.DB_URL) {
    throw new Error('DB_URL environment variable is not defined');
  }
  
  connectionPromise = mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const db = await connectionPromise;
    isConnected = !!db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    // Reset connection promise so we can try again
    connectionPromise = null;
    throw new Error("Database connection failed");
  }
}
