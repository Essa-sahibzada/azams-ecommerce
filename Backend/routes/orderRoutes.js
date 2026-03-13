import express from 'express';
import {
  addOrderItems,
  getOrders,
  getOrderById,
  updateOrderToDelivered,
} from '../controllers/orderController.js';

const router = express.Router();

// POST /api/orders        → Naya order place karo (CheckoutScreen)
router.post('/', addOrderItems);

// GET /api/orders         → Sab orders (Admin OrderListScreen)
router.get('/', getOrders);

// GET /api/orders/:id     → Single order
router.get('/:id', getOrderById);

// PUT /api/orders/:id/deliver → Mark as delivered (Admin)
router.put('/:id/deliver', updateOrderToDelivered);

export default router;