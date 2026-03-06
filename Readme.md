MarketNest – Mini Fashion Marketplace

MarketNest is a full-stack fashion marketplace built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

The platform supports two user roles:

Brand (Seller) – manages products

Customer (User) – browses marketplace products

Brands can create and manage their products while customers can explore products through search, filters, and pagination.

The project demonstrates production-ready backend architecture, secure authentication, and role-based authorization.

Tech Stack
Frontend

React.js

React Router

Axios

TailwindCSS / CSS

Context API (state management)

Backend

Node.js

Express.js

MongoDB

Mongoose

Authentication

JWT Access Token

Refresh Token (httpOnly Cookie)

Password hashing with bcrypt

File Storage

Cloudinary (for product image uploads)

Other Tools

dotenv

cookie-parser

multer

cors

nodemon

Architecture Overview

MarketNest follows a client-server architecture.

React Frontend
      |
      |  REST API Requests
      |
Node.js + Express Backend
      |
      |  Mongoose ODM
      |
MongoDB Database
      |
      |  Image Storage
      |
Cloudinary
Architecture Explanation

Frontend (React)

Handles UI rendering

Manages client routing

Sends API requests to backend

Backend (Express)

Handles authentication

Implements business logic

Validates user roles

Processes image uploads

Communicates with MongoDB

Database (MongoDB)

Stores users

Stores products

Stores refresh tokens

Cloudinary

Stores uploaded product images

Authentication Flow

MarketNest uses secure JWT authentication with access and refresh tokens.

Signup

User registers with:

name

email

password

role (Brand / Customer)

Process:

Password is hashed using bcrypt

User is saved in MongoDB

Access token and refresh token are generated

Refresh token is stored in httpOnly cookie

Login

User submits email + password

Password verified using bcrypt

Backend generates:

Access Token (short expiry)

Refresh Token

Refresh token stored in httpOnly cookie

Token System

Access Token

Short lifetime (15 min)

Used for protected API requests

Refresh Token

Stored in httpOnly cookie

Used to generate new access tokens

Logout

Logout process:

Refresh token cookie cleared

Token removed from database

User session terminated

Authorization

Role based access control is implemented.

Middleware checks:

requireAuth
requireRole("brand")
requireRole("customer")
Brand Access

Allowed to:

create product

edit own product

delete own product

view dashboard

Customer Access

Allowed to:

browse products

search products

filter products

view product details

Customers cannot modify products.

Product Management (Brand)

Brands can perform the following actions:

Create Product

Fields:

product name

description

category

price

images

status (draft / published)

Images are uploaded to Cloudinary.

Edit Product

Brands can edit only their own products.

Ownership check is enforced by comparing:

product.brandId === loggedInUser.id
Soft Delete Product

Products are not permanently removed.

Instead:

isDeleted: true

This ensures:

product history remains

database integrity maintained

Dashboard Summary

Brand dashboard shows:

Total products

Published products

Archived products

Customer Marketplace

Customers can explore the fashion marketplace.

Features include:

Browse Products

Displays published products only.

Product Details

Customer can view:

product images

description

category

price

brand info

Search

Search by:

product name
Category Filter

Filter products by:

category
Pagination

Server-side pagination implemented.

Example API:

GET /api/products?page=1&limit=10

Benefits:

faster queries

reduced frontend load

Database Schema Design
User Schema
User
 ├── name
 ├── email
 ├── password
 ├── role (brand | customer)
 ├── refreshToken
 ├── createdAt
Product Schema
Product
 ├── name
 ├── description
 ├── price
 ├── category
 ├── images [array]
 ├── status (draft | published)
 ├── brandId (reference User)
 ├── isDeleted
 ├── createdAt
Backend Folder Structure
backend
│
├── src
│
├── config
│   ├── db.js
│   └── cloudinary.js
│
├── controllers
│   ├── authController.js
│   ├── productController.js
│   └── brandController.js
│
├── middleware
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── errorMiddleware.js
│
├── models
│   ├── User.js
│   └── Product.js
│
├── routes
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── brandRoutes.js
│
├── services
│   └── tokenService.js
│
├── utils
│   └── pagination.js
│
├── app.js
└── server.js
Frontend Folder Structure
frontend
│
├── src
│
├── components
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProtectedRoute.jsx
│
├── pages
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Marketplace.jsx
│   ├── ProductDetails.jsx
│   ├── BrandDashboard.jsx
│   └── CreateProduct.jsx
│
├── context
│   └── AuthContext.jsx
│
├── services
│   └── api.js
│
├── hooks
│   └── useAuth.js
│
├── App.jsx
└── main.jsx
Environment Variables
Backend .env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
API Routes Overview
Authentication
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
Products
GET /api/products
GET /api/products/:id
GET /api/products/search
Brand
POST /api/brand/products
PUT /api/brand/products/:id
DELETE /api/brand/products/:id
GET /api/brand/dashboard
Security Decisions

The following security practices were implemented:

Password Security

Passwords are hashed using bcrypt.

JWT Authentication

Access tokens expire quickly to reduce risk.

Refresh Token in Cookies

Stored as httpOnly cookie to prevent XSS access.

Role-based Authorization

Routes restricted based on user roles.

Ownership Validation

Brands can modify only their own products.

Environment Variables

Secrets stored in .env instead of code.

Soft Delete Strategy

Prevents accidental data loss.

Deployment
Frontend Deployment

Recommended:

Vercel

Netlify

Backend Deployment

Recommended:

Render

Railway

Cyclic

Database

MongoDB Atlas cloud database.

Installation Guide
Clone Repository
git clone https://github.com/yourusername/marketnest.git
Install Backend
cd backend
npm install

Run backend:

npm run dev
Install Frontend
cd frontend
npm install
npm run dev
AI Tool Usage

AI tools were used for:

brainstorming architecture ideas

improving documentation

debugging certain implementation issues

However, the core application logic, authentication system, and project structure were implemented and customized manually.

Future Improvements

Potential enhancements include:

product reviews

wishlist system

shopping cart

payment gateway

brand analytics dashboard

Conclusion

MarketNest demonstrates:

secure authentication

role-based authorization

scalable backend architecture

modern React frontend

full-stack integration using MERN

This project highlights best practices in building production-ready full-stack applications.