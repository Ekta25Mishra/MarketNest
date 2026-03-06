# MarketNest - Quick Reference Guide

## 🎯 All Features at a Glance

### ✅ Completed Features

| Feature | Status | Location |
|---------|--------|----------|
| Profile Management | ✅ | `/profile` |
| Brand Dashboard | ✅ | `/brand/dashboard` |
| Create Product | ✅ | `/brand/create-product` |
| Edit Product | ✅ | `/brand/edit-product/:id` |
| Delete Product | ✅ | Dashboard (soft delete) |
| Theme Toggle | ✅ | Navbar (🌙/☀️) |
| Light Mode | ✅ | Global |
| Dark Mode | ✅ | Global |
| Product Cards | ✅ | Dashboard + Marketplace |
| Statistics | ✅ | Dashboard |
| Image Upload | ✅ | Products + Profile |
| Ownership Check | ✅ | Backend |
| Role Protection | ✅ | Routes |

---

## 🎨 Theme System

### Toggle Theme
Click the moon (🌙) or sun (☀️) icon in the navbar.

### Theme Persistence
Theme is automatically saved in localStorage.

### CSS Variables
All colors use CSS variables for easy customization:
- `var(--bg-card)` - Card backgrounds
- `var(--text-primary)` - Main text
- `var(--accent)` - Accent color
- `var(--success)` - Success color
- `var(--danger)` - Danger color

---

## 🛣️ Routes

### Public Routes
- `/` - Marketplace
- `/login` - Login
- `/signup` - Signup
- `/products/:id` - Product details

### Protected Routes (Any User)
- `/profile` - User profile

### Brand-Only Routes
- `/brand/dashboard` - Dashboard
- `/brand/create-product` - Create product
- `/brand/edit-product/:id` - Edit product

---

## 🎛️ Dashboard Features

### Statistics Cards
1. **Total Products** - All non-deleted products
2. **Published Products** - Live products
3. **Archived Products** - Soft-deleted products

### Product Management
- **Create Button** - Top right of dashboard
- **Edit Button** - On each product card
- **Delete Button** - On each product card (with confirmation)

### Product Card Shows
- Product image
- Name
- Price
- Status badge (published/draft/archived)
- Action buttons

---

## 👤 Profile Management

### View Profile
- Avatar image
- Name
- Email
- Role (brand/customer)

### Edit Profile
1. Click "Edit Profile" button
2. Update name, email, or avatar
3. Click "Save"

### Delete Account
1. Click "Delete Account" button
2. Confirm in modal
3. Account deleted + logged out

---

## 📦 Product Management

### Create Product
1. Go to `/brand/create-product`
2. Fill in:
   - Name
   - Description
   - Price
   - Category
   - Status (draft/published)
   - Images (multiple)
3. Click "Create Product"

### Edit Product
1. Click "Edit" on product card
2. Update fields
3. Upload new images (optional)
4. Click "Update Product"

### Delete Product
1. Click "Delete" on product card
2. Confirm deletion
3. Product soft-deleted (isDeleted = true)

---

## 🎨 UI Components

### Reusable Components
- `ThemeToggle` - Theme switcher
- `ProductCard` - Marketplace product display
- `ProductCardBrand` - Dashboard product display
- `Navbar` - Global navigation
- `ProtectedRoute` - Route protection

### Component Usage
```jsx
// Use ThemeToggle anywhere
import ThemeToggle from '../components/ThemeToggle';
<ThemeToggle />

// Use theme in any component
import { useTheme } from '../hooks/useTheme';
const { theme, toggleTheme } = useTheme();
```

---

## 🔐 Security

### Authentication
- JWT access tokens (15 min)
- Refresh tokens (7 days, httpOnly)
- Automatic token refresh

### Authorization
- Role-based route protection
- Brand-only product management
- Ownership verification on edit/delete

### Data Protection
- Password hashing (bcrypt)
- Secure image upload (Cloudinary)
- Email uniqueness validation

---

## 🎨 Styling Guide

### Use CSS Variables
```jsx
style={{
  backgroundColor: 'var(--bg-card)',
  color: 'var(--text-primary)',
  border: '1px solid var(--border-color)'
}}
```

### Common Patterns
```jsx
// Card
{
  backgroundColor: 'var(--bg-card)',
  borderRadius: '12px',
  boxShadow: 'var(--shadow)',
  padding: '1rem'
}

// Button
{
  backgroundColor: 'var(--accent)',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  padding: '0.5rem 1rem',
  cursor: 'pointer'
}

// Hover Effect
{
  transition: 'transform 0.2s, box-shadow 0.2s'
}
```

---

## 📱 API Endpoints

### User Profile
```
GET    /api/users/profile
PATCH  /api/users/profile
DELETE /api/users/profile
```

### Brand Products
```
GET    /api/brand/products
POST   /api/brand/products
PATCH  /api/brand/products/:id
DELETE /api/brand/products/:id
GET    /api/brand/dashboard
```

### Public Products
```
GET /api/products
GET /api/products/:id
GET /api/products/search
```

---

## 🚀 Quick Actions

### As Brand
1. **View Dashboard**: Click "Dashboard" in navbar
2. **Create Product**: Click "+ Create Product" button
3. **Edit Product**: Click "Edit" on product card
4. **Delete Product**: Click "Delete" on product card
5. **View Profile**: Click "Profile" in navbar
6. **Toggle Theme**: Click 🌙/☀️ in navbar

### As Customer
1. **Browse Products**: Go to homepage
2. **Search Products**: Use search bar
3. **Filter Products**: Select category
4. **View Details**: Click product card
5. **View Profile**: Click "Profile" in navbar
6. **Toggle Theme**: Click 🌙/☀️ in navbar

---

## 🎯 Testing Checklist

### Profile System
- [ ] View profile
- [ ] Edit name
- [ ] Edit email
- [ ] Upload avatar
- [ ] Delete account

### Product Management (Brand)
- [ ] Create product
- [ ] Edit own product
- [ ] Delete own product
- [ ] View dashboard stats
- [ ] See product list

### Theme System
- [ ] Toggle to dark mode
- [ ] Toggle to light mode
- [ ] Refresh page (theme persists)
- [ ] Check all pages use theme

### UI/UX
- [ ] Hover effects work
- [ ] Transitions are smooth
- [ ] Cards look modern
- [ ] Responsive on mobile
- [ ] All buttons work

---

## 💡 Tips

1. **Theme Preference**: Your theme choice is saved automatically
2. **Product Status**: Use "draft" for work-in-progress products
3. **Image Upload**: Multiple images supported for products
4. **Soft Delete**: Deleted products can be recovered from database
5. **Ownership**: You can only edit/delete your own products

---

## 🐛 Troubleshooting

### Theme Not Changing
- Check browser console for errors
- Clear localStorage and try again
- Refresh the page

### Can't Edit Product
- Ensure you're the product owner
- Check if you're logged in as brand
- Verify product exists and isn't deleted

### Images Not Uploading
- Check Cloudinary credentials in backend .env
- Verify file size is reasonable
- Check internet connection

### Profile Not Updating
- Ensure all required fields are filled
- Check for email uniqueness
- Verify you're logged in

---

## 📚 File Locations

### Key Frontend Files
```
src/pages/BrandDashboard.jsx
src/pages/Profile.jsx
src/pages/CreateProduct.jsx
src/pages/EditProduct.jsx
src/components/ThemeToggle.jsx
src/components/ProductCardBrand.jsx
src/context/ThemeContext.jsx
src/styles/global.css
```

### Key Backend Files
```
src/controllers/userController.js
src/controllers/brandController.js
src/routes/userRoutes.js
src/routes/brandRoutes.js
src/models/User.js (with avatar field)
```

---

**Everything is ready to use! 🎉**

For detailed documentation, see `COMPLETE_IMPLEMENTATION.md`
