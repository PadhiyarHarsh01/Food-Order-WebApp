import express, { Request, Response } from 'express';
import Order from '../models/Order.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
  body: any;
  params: any;
  query: any;
}

// Create order
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { restaurant, items, totalAmount, deliveryAddress, specialInstructions } = req.body;

    const order = new Order({
      user: req.user?.userId,
      restaurant,
      items,
      totalAmount,
      deliveryAddress,
      specialInstructions,
      status: 'pending',
      paymentStatus: 'pending',
    });

    await order.save();
    await order.populate('restaurant');
    await order.populate('items.menuItem');

    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get user orders
router.get('/user/my-orders', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user?.userId })
      .populate('restaurant', 'name address')
      .populate('items.menuItem', 'name price');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get restaurant orders
router.get('/restaurant/:restaurantId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'restaurant_owner') {
      return res.status(403).json({ error: 'Only restaurant owners can view restaurant orders' });
    }

    const orders = await Order.find({ restaurant: req.params.restaurantId })
      .populate('user', 'name email phone')
      .populate('items.menuItem', 'name');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get order by ID
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('restaurant')
      .populate('items.menuItem');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status
router.patch('/:id/status', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({
      message: 'Order status updated',
      order,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Update payment status
router.patch('/:id/payment', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.paymentStatus = paymentStatus;
    if (paymentStatus === 'completed') {
      order.status = 'confirmed';
    }
    await order.save();

    res.json({
      message: 'Payment status updated',
      order,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

// Cancel order
router.patch('/:id/cancel', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({ error: 'Cannot cancel this order' });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({
      message: 'Order cancelled successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel order' });
  }
});

export default router;
