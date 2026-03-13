import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Agar .env file mein MONGO_URI nahi hai toh ye local use karega
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/azams');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;