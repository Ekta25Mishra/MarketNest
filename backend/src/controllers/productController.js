import Product from '../models/Product.js';
import { paginate, paginateResponse } from '../utils/pagination.js';

export const getProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      search, 
      minPrice, 
      maxPrice, 
      sort = '-createdAt' 
    } = req.query;
    
    const query = { isDeleted: false, status: 'published' };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    const { skip, limit: limitNum, page: pageNum } = paginate(page, limit);
    
    let sortOption = { createdAt: -1 };
    if (sort === 'price') sortOption = { price: 1 };
    if (sort === '-price') sortOption = { price: -1 };
    if (sort === '-createdAt') sortOption = { createdAt: -1 };
    
    const products = await Product.find(query)
      .populate('brandId', 'name email')
      .skip(skip)
      .limit(limitNum)
      .sort(sortOption);
    
    const total = await Product.countDocuments(query);
    
    const response = paginateResponse(products, total, pageNum, limitNum);
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findOneAndUpdate(
      { _id: id, isDeleted: false, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('brandId', 'name email');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query required' });
    }
    
    const query = {
      isDeleted: false,
      status: 'published',
      name: { $regex: q, $options: 'i' }
    };
    
    const { skip, limit: limitNum, page: pageNum } = paginate(page, limit);
    
    const products = await Product.find(query)
      .populate('brandId', 'name email')
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });
    
    const total = await Product.countDocuments(query);
    
    const response = paginateResponse(products, total, pageNum, limitNum);
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
