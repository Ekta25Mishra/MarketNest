# MarketNest - Development Commands Reference

## 🚀 Installation Commands

### First Time Setup
```bash
# Clone or navigate to project
cd MarketNest

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## 🔧 Development Commands

### Start Backend Server
```bash
cd backend
npm run dev
```
Server runs on: http://localhost:5000

### Start Frontend Server
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:5173

### Run Both Servers (Use 2 terminals)
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

## 📦 Production Commands

### Build Frontend for Production
```bash
cd frontend
npm run build
```
Output: `frontend/dist/`

### Preview Production Build
```bash
cd frontend
npm run preview
```

### Start Backend in Production
```bash
cd backend
npm start
```

## 🧹 Maintenance Commands

### Clean Install (if issues occur)
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Update Dependencies
```bash
# Backend
cd backend
npm update

# Frontend
cd frontend
npm update
```

## 🗄️ Database Commands

### MongoDB Local
```bash
# Start MongoDB service (Windows)
net start MongoDB

# Start MongoDB service (Mac/Linux)
sudo systemctl start mongod

# Connect to MongoDB shell
mongosh

# Use MarketNest database
use marketnest

# View collections
show collections

# View users
db.users.find()

# View products
db.products.find()

# Clear database (careful!)
db.users.deleteMany({})
db.products.deleteMany({})
```

### MongoDB Atlas
- Access via web interface: https://cloud.mongodb.com
- No local commands needed

## 🔑 Generate JWT Secrets

### Using Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Using OpenSSL
```bash
openssl rand -hex 32
```

## 🧪 Testing API Endpoints

### Using curl

#### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"customer"}'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

#### Get Products
```bash
curl http://localhost:5000/api/products
```

#### Get Products with Pagination
```bash
curl "http://localhost:5000/api/products?page=1&limit=10"
```

#### Search Products
```bash
curl "http://localhost:5000/api/products/search?q=dress"
```

#### Filter by Category
```bash
curl "http://localhost:5000/api/products?category=Women"
```

## 🐛 Debugging Commands

### Check if ports are in use

#### Windows
```bash
# Check port 5000
netstat -ano | findstr :5000

# Check port 5173
netstat -ano | findstr :5173
```

#### Mac/Linux
```bash
# Check port 5000
lsof -i :5000

# Check port 5173
lsof -i :5173
```

### Kill process on port

#### Windows
```bash
# Find PID first, then:
taskkill /PID <PID> /F
```

#### Mac/Linux
```bash
# Kill process on port 5000
kill -9 $(lsof -t -i:5000)

# Kill process on port 5173
kill -9 $(lsof -t -i:5173)
```

### View Backend Logs
```bash
cd backend
npm run dev
# Logs appear in terminal
```

### View Frontend Logs
```bash
cd frontend
npm run dev
# Logs appear in terminal and browser console
```

## 📝 Git Commands (if using version control)

### Initialize Git
```bash
git init
git add .
git commit -m "Initial commit: Complete MarketNest implementation"
```

### Create .gitignore (already created)
```bash
# Backend .gitignore includes:
# node_modules, .env, uploads/

# Frontend .gitignore includes:
# node_modules, dist, .env, .env.local
```

### Push to GitHub
```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

## 🌐 Environment Variables

### View Current Environment (Backend)
```bash
cd backend
cat .env
```

### Edit Environment Variables
```bash
# Windows
notepad backend\.env

# Mac/Linux
nano backend/.env
# or
vim backend/.env
```

## 📊 Useful NPM Commands

### Check Installed Packages
```bash
npm list --depth=0
```

### Check for Outdated Packages
```bash
npm outdated
```

### Install Specific Version
```bash
npm install package-name@version
```

### Uninstall Package
```bash
npm uninstall package-name
```

## 🔍 Troubleshooting Commands

### Clear npm cache
```bash
npm cache clean --force
```

### Verify npm installation
```bash
npm doctor
```

### Check Node and npm versions
```bash
node --version
npm --version
```

### Reinstall node_modules
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Quick Development Workflow

### Daily Development
```bash
# 1. Start MongoDB (if local)
# Windows: net start MongoDB
# Mac/Linux: sudo systemctl start mongod

# 2. Start Backend (Terminal 1)
cd backend
npm run dev

# 3. Start Frontend (Terminal 2)
cd frontend
npm run dev

# 4. Open browser
# http://localhost:5173
```

### After Making Changes
```bash
# Backend changes - server auto-restarts (nodemon)
# Frontend changes - page auto-reloads (Vite HMR)
# No manual restart needed!
```

## 📱 Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/products

## 🎯 Common Tasks

### Add New npm Package

#### Backend
```bash
cd backend
npm install package-name
```

#### Frontend
```bash
cd frontend
npm install package-name
```

### Create New Component (Frontend)
```bash
cd frontend/src/components
# Create new .jsx file
```

### Create New API Route (Backend)
```bash
cd backend/src/routes
# Create new route file
# Import in app.js
```

### Add New Environment Variable
```bash
# 1. Add to backend/.env
# 2. Add to backend/.env.example
# 3. Restart backend server
```

## 💡 Pro Tips

1. **Use nodemon**: Backend auto-restarts on file changes
2. **Use Vite HMR**: Frontend hot-reloads instantly
3. **Check logs**: Always check terminal for errors
4. **Use browser DevTools**: Check Network tab for API calls
5. **Test API first**: Use curl or Postman before frontend integration
6. **Keep .env secure**: Never commit .env to git
7. **Use .env.example**: Share template without secrets

## 🆘 Emergency Commands

### Complete Reset
```bash
# Stop all servers (Ctrl+C in terminals)

# Backend reset
cd backend
rm -rf node_modules package-lock.json uploads
npm install

# Frontend reset
cd frontend
rm -rf node_modules package-lock.json dist
npm install

# Database reset (careful!)
# Drop database in MongoDB

# Restart everything
```

### Check Everything is Working
```bash
# 1. Backend health
curl http://localhost:5000/api/products

# 2. Frontend loading
curl http://localhost:5173

# 3. MongoDB connection
# Check backend terminal for "MongoDB connected successfully"
```

---

## 📚 Additional Resources

- **Node.js Docs**: https://nodejs.org/docs
- **Express.js Docs**: https://expressjs.com
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **MongoDB Docs**: https://docs.mongodb.com
- **Axios Docs**: https://axios-http.com

---

**Happy Coding! 🚀**
