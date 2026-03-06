# MarketNest - Quick Start Commands

## Initial Setup

### Backend
```bash
cd backend
npm install
# Configure .env file with your credentials
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables Required

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## Default URLs
- Backend API: http://localhost:5000
- Frontend: http://localhost:5173

## User Roles
1. **Brand** - Can create, edit, delete products and view dashboard
2. **Customer** - Can browse, search, and filter products

## Key Features Implemented

✅ JWT Authentication (Access + Refresh Token)
✅ Role-based Authorization
✅ Password Hashing (bcrypt)
✅ Image Upload (Cloudinary)
✅ Product Management (CRUD)
✅ Search & Filter
✅ Pagination
✅ Soft Delete
✅ Brand Dashboard
✅ Protected Routes

## Testing Flow

1. Start backend and frontend servers
2. Create a Brand account via Signup
3. Login as Brand
4. Create products with images
5. Logout and create Customer account
6. Browse marketplace as Customer
7. Search and filter products
8. View product details
