import express from 'express';
import { addToWishlist, removeFromWishlist, getWishlist, checkWishlist } from '../controllers/wishlistController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

router.post('/add/:productId', addToWishlist);
router.delete('/remove/:productId', removeFromWishlist);
router.get('/', getWishlist);
router.get('/check/:productId', checkWishlist);

export default router;
