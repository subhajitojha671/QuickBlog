// Import mongoose (used to connect and work with MongoDB)
import mongoose from "mongoose";

// Function to connect database
const connectDB = async () => {
  try {

    // Listen for successful connection event
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    // Connect to MongoDB using URI from .env file
    // "/writeblog" is your database name
    await mongoose.connect(`${process.env.MONGODB_URI}/writeblog`);

  } catch (error) {

    // If connection fails, show error message
    console.log('Error connecting to MongoDB:', error.message);
  }
};

// Export this function so you can use it in server.js
export default connectDB;