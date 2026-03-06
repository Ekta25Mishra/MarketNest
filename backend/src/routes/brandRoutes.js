import express from 'express';
import multer from 'multer';
import { createProduct, updateProduct, deleteProduct, getDashboard, getBrandProducts } from '../controllers/brandController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.use(requireAuth);
router.use(requireRole('brand'));

router.get('/products', getBrandProducts);
router.post('/products', upload.array('images', 5), createProduct);
router.patch('/products/:id', upload.array('images', 5), updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/dashboard', getDashboard);

export default router;
