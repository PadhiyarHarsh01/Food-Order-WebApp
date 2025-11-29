import express, { Request, Response } from 'express';
import MenuItem from '../models/MenuItem.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
  body: any;
  params: any;
  query: any;
}

// Get menu items by restaurant
router.get('/restaurant/:restaurantId', async (req: AuthRequest, res: Response) => {
  try {
    const menuItems = await MenuItem.find({ restaurant: req.params.restaurantId });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Get all menu items
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { cuisine, category } = req.query;
    let filter: any = {};

    if (cuisine) filter.cuisine = cuisine;
    if (category) filter.category = category;

    const menuItems = await MenuItem.find(filter).populate('restaurant', 'name');
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Create menu item
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'restaurant_owner') {
      return res.status(403).json({ error: 'Only restaurant owners can add menu items' });
    }

    const { name, description, price, image, category, cuisine, isVegetarian, restaurant } = req.body;

    const menuItem = new MenuItem({
      name,
      description,
      price,
      image,
      category,
      cuisine,
      isVegetarian,
      restaurant,
    });

    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});

// Update menu item
router.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    if (req.user?.role !== 'restaurant_owner') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// Delete menu item
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    if (req.user?.role !== 'restaurant_owner') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

export default router;
