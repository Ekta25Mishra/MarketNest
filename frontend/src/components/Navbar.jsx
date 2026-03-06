import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const styles = {
    nav: {
      backgroundColor: 'var(--bg-card)',
      padding: '1rem',
      boxShadow: 'var(--shadow)',
      borderBottom: '1px solid var(--border-color)'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'var(--accent)',
      textDecoration: 'none'
    },
    links: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center'
    },
    link: {
      color: 'var(--text-primary)',
      textDecoration: 'none',
      transition: 'color 0.2s',
      fontWeight: '500'
    },
    user: {
      color: 'var(--text-secondary)'
    },
    button: {
      backgroundColor: 'var(--danger)',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'opacity 0.2s'
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>MarketNest</Link>
        
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Marketplace</Link>
          
          {user ? (
            <>
              {user.role === 'brand' && (
                <>
                  <Link to="/brand/dashboard" style={styles.link}>Dashboard</Link>
                  <Link to="/brand/create-product" style={styles.link}>Create Product</Link>
                </>
              )}
              {user.role === 'customer' && (
                <Link to="/wishlist" style={styles.link}>Wishlist</Link>
              )}
              <Link to="/profile" style={styles.link}>Profile</Link>
              <NotificationBell />
              <span style={styles.user}>Hello, {user.name}</span>
              <ThemeToggle />
              <button onClick={handleLogout} style={styles.button}>Logout</button>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/signup" style={styles.link}>Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
