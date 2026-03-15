import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// ── Middleware ──
app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: false,
}));
app.use(express.json());

// ── Database Connection ──
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// ── API Routes ──
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/users', userRoutes);

// ── Test Route ──
app.get('/', (req, res) => {
  res.send('AZAMS API is running... 🚀');
});

// ── 404 Handler ──
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} nahi mili` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;