# 🚀 MarketNest - Getting Started Guide

## 📋 What You Have

A complete, production-ready MERN stack fashion marketplace with:

- ✅ **Backend**: Node.js + Express + MongoDB
- ✅ **Frontend**: React + Vite + React Router
- ✅ **Authentication**: JWT (Access + Refresh Tokens)
- ✅ **Authorization**: Role-based (Brand & Customer)
- ✅ **Image Upload**: Cloudinary integration
- ✅ **Features**: CRUD, Search, Filter, Pagination, Soft Delete

---

## 🎯 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Environment

**Backend Configuration** (`backend/.env`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/marketnest
JWT_ACCESS_SECRET=your_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_here
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Get Cloudinary Credentials**:
1. Sign up at https://cloudinary.com (free)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

**MongoDB Options**:
- **Local**: Install MongoDB and use `mongodb://localhost:27017/marketnest`
- **Cloud**: Use MongoDB Atlas (free tier) at https://www.mongodb.com/cloud/atlas

### Step 3: Run the Application

```bash
# Terminal 1 - Start Backend (from backend folder)
cd backend
npm run dev
# Backend runs on http://localhost:5000

# Terminal 2 - Start Frontend (from frontend folder)
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🧪 Test the Application

### 1. Create a Brand Account
1. Open http://localhost:5173/signup
2. Enter details:
   - Name: "Fashion Brand"
   - Email: "brand@example.com"
   - Password: "password123"
   - Role: **Brand**
3. Click "Sign Up"

### 2. Create Products (as Brand)
1. You'll be redirected to Brand Dashboard
2. Click "Create Product" in navbar
3. Fill in product details:
   - Name: "Summer Dress"
   - Description: "Beautiful summer dress"
   - Price: 49.99
   - Category: "Women"
   - Status: "Published"
   - Upload images
4. Click "Create Product"

### 3. Browse Marketplace (as Customer)
1. Logout from Brand account
2. Sign up as Customer:
   - Name: "John Doe"
   - Email: "customer@example.com"
   - Password: "password123"
   - Role: **Customer**
3. Browse products on homepage
4. Use search and filters
5. Click on products to view details

---

## 📁 Project Structure

```
MarketNest/
├── backend/                    # Node.js + Express Backend
│   ├── src/
│   │   ├── config/            # Database & Cloudinary config
│   │   ├── controllers/       # Business logic
│   │   ├── middleware/        # Auth & Role checks
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API endpoints
│   │   ├── services/          # JWT token service
│   │   ├── utils/             # Pagination utility
│   │   ├── app.js             # Express app setup
│   │   └── server.js          # Server entry point
│   ├── .env                   # Environment variables
│   └── package.json
│
└── frontend/                   # React Frontend
    ├── src/
    │   ├── components/        # Reusable components
    │   ├── context/           # Auth context
    │   ├── hooks/             # Custom hooks
    │   ├── pages/             # Page components
    │   ├── services/          # API calls
    │   ├── App.jsx            # Main app component
    │   └── main.jsx           # Entry point
    ├── index.html
    └── package.json
```

---

## 🔑 Key Features Implemented

### Authentication & Authorization
- ✅ Signup with role selection (Brand/Customer)
- ✅ Login with JWT tokens
- ✅ Access token (15 min expiry)
- ✅ Refresh token (7 days, httpOnly cookie)
- ✅ Automatic token refresh
- ✅ Role-based route protection

### Brand Features
- ✅ Create products with multiple images
- ✅ Edit own products only
- ✅ Soft delete products
- ✅ View dashboard statistics
- ✅ Upload images to Cloudinary

### Customer Features
- ✅ Browse published products
- ✅ Search products by name
- ✅ Filter by category
- ✅ View product details
- ✅ Pagination support

### Security
- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ httpOnly cookies for refresh tokens
- ✅ Role-based authorization
- ✅ Ownership validation
- ✅ Environment variables for secrets

---

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/signup      - Register new user
POST   /api/auth/login       - Login user
POST   /api/auth/logout      - Logout user
POST   /api/auth/refresh     - Refresh access token
```

### Products (Public)
```
GET    /api/products         - Get all products (paginated)
GET    /api/products/:id     - Get product by ID
GET    /api/products/search  - Search products
```

### Brand (Protected - Brand Role Only)
```
POST   /api/brand/products      - Create product
PUT    /api/brand/products/:id  - Update product
DELETE /api/brand/products/:id  - Delete product (soft)
GET    /api/brand/dashboard     - Get dashboard stats
```

---

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **multer** - File upload
- **cookie-parser** - Cookie handling
- **cors** - Cross-origin requests

### Frontend
- **React 18** - UI library
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **Context API** - State management

---

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check if MongoDB is running
- ✅ Verify .env file exists and has correct values
- ✅ Ensure port 5000 is not in use

### Frontend won't start
- ✅ Check if backend is running
- ✅ Verify node_modules is installed
- ✅ Ensure port 5173 is not in use

### Images not uploading
- ✅ Verify Cloudinary credentials in .env
- ✅ Check internet connection
- ✅ Ensure image file size is reasonable

### CORS errors
- ✅ Ensure backend is running on port 5000
- ✅ Check CORS configuration in backend/src/app.js
- ✅ Verify frontend is on port 5173

---

## 📚 Additional Resources

- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Cloudinary**: https://cloudinary.com
- **React Router**: https://reactrouter.com
- **Express.js**: https://expressjs.com
- **JWT**: https://jwt.io

---

## 🚀 Deployment

### Backend (Render/Railway/Cyclic)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set build command: `npm run build`
4. Set VITE_API_URL to production backend URL
5. Deploy

### Database (MongoDB Atlas)
1. Create cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Update MONGO_URI in backend environment variables

---

## ✅ What's Included

- ✅ Complete backend with clean architecture
- ✅ Complete frontend with React best practices
- ✅ Authentication & authorization system
- ✅ Image upload functionality
- ✅ Search, filter, and pagination
- ✅ Role-based access control
- ✅ Protected routes
- ✅ Error handling
- ✅ Security best practices
- ✅ Production-ready code

---

## 📝 Next Steps

1. **Customize**: Modify styles, add more categories, enhance UI
2. **Extend**: Add features like reviews, wishlist, shopping cart
3. **Deploy**: Deploy to production (Vercel + Render)
4. **Test**: Add unit and integration tests
5. **Monitor**: Add logging and monitoring

---

## 💡 Tips

- Use strong JWT secrets in production
- Enable MongoDB authentication
- Use HTTPS in production
- Implement rate limiting
- Add input validation
- Set up proper logging
- Use environment-specific configs

---

## 🎉 You're Ready!

Your MarketNest application is complete and ready to run. Follow the Quick Start steps above and you'll have a fully functional fashion marketplace in minutes!

For detailed information, see:
- `INSTALLATION.md` - Detailed setup instructions
- `PROJECT_SUMMARY.md` - Complete feature list
- `QUICKSTART.md` - Quick reference commands
- `README.md` - Project overview

Happy coding! 🚀
