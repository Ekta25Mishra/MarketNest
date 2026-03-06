import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';
import { createNotification } from './notificationController.js';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, status } = req.body;
    
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    let imageUrls = [];
    
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => 
        cloudinary.uploader.upload(file.path, {
          folder: 'marketnest'
        })
      );
      
      const results = await Promise.all(uploadPromises);
      imageUrls = results.map(result => result.secure_url);
    }
    
    const product = new Product({
      name,
      description,
      price,
      category,
      images: imageUrls,
      status: status || 'draft',
      brandId: req.user.userId
    });
    
    await product.save();
    
    // Create notification
    await createNotification(
      req.user.userId,
      `Your product "${product.name}" was created successfully`,
      'product'
    );
    
    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, status } = req.body;
    
    const product = await Product.findOne({ _id: id, isDeleted: false });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.brandId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only edit your own products' });
    }
    
    let imageUrls = product.images;
    
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => 
        cloudinary.uploader.upload(file.path, {
          folder: 'marketnest'
        })
      );
      
      const results = await Promise.all(uploadPromises);
      imageUrls = results.map(result => result.secure_url);
    }
    
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.status = status || product.status;
    product.images = imageUrls;
    
    await product.save();
    
    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findOne({ _id: id, isDeleted: false });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.brandId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only delete your own products' });
    }
    
    product.isDeleted = true;
    await product.save();
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const brandId = req.user.userId;
    
    const totalProducts = await Product.countDocuments({ 
      brandId, 
      isDeleted: false 
    });
    
    const publishedProducts = await Product.countDocuments({ 
      brandId, 
      isDeleted: false, 
      status: 'published' 
    });
    
    const archivedProducts = await Product.countDocuments({ 
      brandId, 
      isDeleted: true 
    });
    
    const draftProducts = await Product.countDocuments({
      brandId,
      isDeleted: false,
      status: 'draft'
    });
    
    // Calculate total views
    const products = await Product.find({ brandId, isDeleted: false });
    const totalViews = products.reduce((sum, p) => sum + (p.views || 0), 0);
    
    // Mock sales data
    const totalSales = Math.floor(Math.random() * 1000);
    
    res.json({
      totalProducts,
      publishedProducts,
      archivedProducts,
      draftProducts,
      totalViews,
      totalSales
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getBrandProducts = async (req, res) => {
  try {
    const brandId = req.user.userId;
    const products = await Product.find({ brandId, isDeleted: false }).sort({ createdAt: -1 });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
