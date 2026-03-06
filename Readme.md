📌MarketNest – Brand Product Management Platform
 
MarketNest is a MERN stack web application designed to help brands manage their products efficiently. The platform allows brands to register, log in, and manage product listings through a dedicated dashboard.

Brands can add, publish, archive, and track their products, while administrators can monitor the platform. The system provides a structured way for brands to organize their product information and maintain an online catalog.

This project demonstrates full-stack development using MongoDB, Express.js, React.js, and Node.js, along with authentication and REST API integration.

🚀 Features
🔐 Authentication

Brand registration

Brand login

Admin login

Secure authentication system

📦 Product Management

Add new products

Edit product details

Publish products

Archive products

Delete products

📊 Brand Dashboard

View product statistics:

Total Products

Published Products

Archived Products

🌐 API Integration

RESTful API for authentication and product management

Backend deployed on Render

Frontend deployed on Vercel

🛠 Tech Stack
Frontend

React.js

React Router

Axios

CSS / Tailwind (if used)

Backend

Node.js

Express.js

MongoDB

JWT Authentication

CORS

Deployment

Frontend: Vercel
https://market-nest-seven.vercel.app/

Backend: Render
https://marketnest-backend-asa8.onrender.com

Database: MongoDB Atlas

📂 Project Structure
MarketNest
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── context
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   └── server.js
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/MarketNest.git
cd MarketNest
2️⃣ Install Dependencies
Backend
cd backend
npm install
Frontend
cd frontend
npm install
3️⃣ Environment Variables

Create a .env file in the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
4️⃣ Run the Project
Start Backend
cd backend
npm run dev
Start Frontend
cd frontend
npm start
📡 API Endpoints
Auth Routes
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/admin-login
Product Routes
GET /api/products
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
📊 Future Improvements

Role based authentication

Product analytics dashboard

Image upload for products

Search & filter functionality

Payment or marketplace integration

👩‍💻 Author

Ekta Mishra

B.Tech Computer Science & Software Engineering Student
Passionate about MERN stack development and building scalable web applications.
