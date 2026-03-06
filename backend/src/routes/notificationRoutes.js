import express from 'express';
import { getNotifications, markAsRead, markAllAsRead } from '../controllers/notificationController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getNotifications);
router.patch('/read/:id', markAsRead);
router.patch('/read-all', markAllAsRead);

export default router;
