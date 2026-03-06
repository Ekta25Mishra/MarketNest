import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const existing = await Wishlist.findOne({
      userId: req.user.userId,
      productId
    });
    
    if (existing) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
    
    const wishlistItem = new Wishlist({
      userId: req.user.userId,
      productId
    });
    
    await wishlistItem.save();
    res.status(201).json({ message: 'Added to wishlist', wishlistItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    
    await Wishlist.findOneAndDelete({
      userId: req.user.userId,
      productId
    });
    
    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user.userId })
      .populate({
        path: 'productId',
        match: { isDeleted: false, status: 'published' }
      })
      .sort({ createdAt: -1 });
    
    const products = wishlist
      .filter(item => item.productId)
      .map(item => item.productId);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const exists = await Wishlist.findOne({
      userId: req.user.userId,
      productId
    });
    
    res.json({ inWishlist: !!exists });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
