import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async function () {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    const db = process.env.MONGODB_URI || "";
    await mongoose.connect(db, {
      dbName: "share_prompt",
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
