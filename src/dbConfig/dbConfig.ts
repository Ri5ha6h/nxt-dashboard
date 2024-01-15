import mongoose from "mongoose";

export const connect = async() => {
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection;
    connection.on('connected', () => {
        console.log("MongoDB Connected Successfully!!");
    })
    connection.on('error', (err) => {
        console.error("Something went wrong while connection to MongoDB", err);
        process.exit();
    })
  } catch (error) {
    console.error("Something went wrong!!!", error);
  }
}
