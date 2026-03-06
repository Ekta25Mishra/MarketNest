# MarketNest - Installation Guide

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account

## Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `.env` file
   - Update the following variables:

```env
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/marketnest
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/marketnest

# JWT Secrets (generate random strings)
JWT_ACCESS_SECRET=your_random_access_secret_here
JWT_REFRESH_SECRET=your_random_refresh_secret_here

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the backend server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

## Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create `.env` file if you need custom API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## MongoDB Setup

### Option 1: Local MongoDB
- Install MongoDB locally
- Start MongoDB service
- Use connection string: `mongodb://localhost:27017/marketnest`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get connection string
4. Replace `<username>` and `<password>` with your credentials
5. Update MONGO_URI in backend/.env

## Cloudinary Setup

1. Create account at https://cloudinary.com
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret
4. Update these values in backend/.env

## Testing the Application

### Create a Brand Account
1. Go to http://localhost:5173/signup
2. Fill in details and select "Brand" role
3. Login and access Brand Dashboard
4. Create products with images

### Create a Customer Account
1. Go to http://localhost:5173/signup
2. Fill in details and select "Customer" role
3. Login and browse marketplace
4. Search and filter products

## API Endpoints

### Authentication
- POST /api/auth/signup - Register new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user
- POST /api/auth/refresh - Refresh access token

### Products (Public)
- GET /api/products - Get all published products (with pagination)
- GET /api/products/:id - Get product details
- GET /api/products/search?q=query - Search products

### Brand (Protected - Brand Role Only)
- POST /api/brand/products - Create product
- PUT /api/brand/products/:id - Update product
- DELETE /api/brand/products/:id - Soft delete product
- GET /api/brand/dashboard - Get dashboard stats

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify .env variables are set correctly
- Check if port 5000 is available

### Frontend won't start
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if port 5173 is available

### Images not uploading
- Verify Cloudinary credentials in .env
- Check internet connection
- Ensure images are in supported formats (jpg, png, etc.)

### CORS errors
- Ensure backend is running
- Check CORS configuration in backend/src/app.js
- Verify frontend URL matches CORS origin

## Production Deployment

### Backend
- Deploy to Render, Railway, or Cyclic
- Set environment variables in hosting platform
- Use MongoDB Atlas for database

### Frontend
- Deploy to Vercel or Netlify
- Set VITE_API_URL to production backend URL
- Build command: `npm run build`

## Project Structure

```
MarketNest/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── services/
    │   ├── hooks/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

## Support

For issues or questions, please refer to the main README.md file.
