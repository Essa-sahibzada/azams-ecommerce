import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/azams');

const importData = async () => {
  try {
    await Product.deleteMany(); // Purana data saaf karne ke liye

    const sampleProduct = {
      name: 'Classic White Shirt',
      image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg',
      description: 'High quality cotton shirt',
      category: 'Menswear',
      price: 2500,
      countInStock: 10,
    };

    await Product.insertMany([sampleProduct]);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();