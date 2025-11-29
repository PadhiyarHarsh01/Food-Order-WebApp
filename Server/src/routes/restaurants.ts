import express, { Request, Response } from 'express';
import Restaurant from '../models/Restaurant.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
  body: any;
  params: any;
  query: any;
}

// Get all restaurants
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { city, cuisine } = req.query;
    let filter: any = {};

    if (city) filter.city = city;
    if (cuisine) filter.cuisines = { $in: [cuisine] };

    const restaurants = await Restaurant.find(filter).populate('owner', 'name email');
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// Get restaurant by ID
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('owner', 'name email');
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch restaurant' });
  }
});

// Create restaurant (restaurant owner only)
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'restaurant_owner') {
      return res.status(403).json({ error: 'Only restaurant owners can create restaurants' });
    }

    const { name, description, image, address, city, cuisines, deliveryTime, minimumOrder } = req.body;

    const restaurant = new Restaurant({
      name,
      description,
      image,
      address,
      city,
      cuisines,
      deliveryTime,
      minimumOrder,
      owner: req.user.userId,
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create restaurant' });
  }
});

// Update restaurant
router.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    if (restaurant.owner.toString() !== req.user?.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update restaurant' });
  }
});

// Delete restaurant
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    if (restaurant.owner.toString() !== req.user?.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
});

export default router;
