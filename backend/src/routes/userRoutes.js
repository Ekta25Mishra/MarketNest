import express from 'express';
import multer from 'multer';
import { getProfile, updateProfile, deleteProfile } from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.use(requireAuth);

router.get('/profile', getProfile);
router.patch('/profile', upload.single('avatar'), updateProfile);
router.delete('/profile', deleteProfile);

export default router;
