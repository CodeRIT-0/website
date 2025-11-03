const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/test";

async function dropEmailIndex() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;
    const collection = db.collection("icebreaker25");

    const indexes = await collection.indexes();
    console.log("Current indexes:", indexes);

    try {
      await collection.dropIndex("email_1");
      console.log("Successfully dropped email_1 index");
    } catch (error) {
      if (error.code === 27) {
        console.log("email_1 index does not exist");
      } else {
        throw error;
      }
    }

    const newIndexes = await collection.indexes();
    console.log("Remaining indexes:", newIndexes);

    await mongoose.connection.close();
    console.log("Done!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

dropEmailIndex();
