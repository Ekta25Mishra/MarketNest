import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import BrandDashboard from './pages/BrandDashboard';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import Profile from './pages/Profile';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div style={{ minHeight: '100vh' }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Marketplace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/brand/dashboard"
                element={
                  <ProtectedRoute requiredRole="brand">
                    <BrandDashboard />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/brand/create-product"
                element={
                  <ProtectedRoute requiredRole="brand">
                    <CreateProduct />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/brand/edit-product/:id"
                element={
                  <ProtectedRoute requiredRole="brand">
                    <EditProduct />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
