import express, { Request, Response } from 'express';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
  body: any;
  params: any;
  query: any;
}

// Get current user profile
router.get('/profile', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { name, phone, address } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      { name, phone, address },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get all users (admin only)
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID (admin only)
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'admin' && req.user?.userId !== req.params.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
