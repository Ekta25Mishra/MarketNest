import express from 'express';
import { createReview, getProductReviews, deleteReview } from '../controllers/reviewController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', requireAuth, createReview);
router.get('/:productId', getProductReviews);
router.delete('/:id', requireAuth, deleteReview);

export default router;
