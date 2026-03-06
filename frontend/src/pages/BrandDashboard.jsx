import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { brandAPI } from '../services/api';
import ProductCardBrand from '../components/ProductCardBrand';

const BrandDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    publishedProducts: 0,
    archivedProducts: 0
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [dashboardRes, productsRes] = await Promise.all([
        brandAPI.getDashboard(),
        brandAPI.getBrandProducts()
      ]);
      setStats(dashboardRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await brandAPI.deleteProduct(id);
      fetchData();
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginTop: '2rem',
      marginBottom: '3rem'
    },
    card: {
      backgroundColor: 'var(--bg-card)',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: 'var(--shadow)',
      textAlign: 'center',
      transition: 'transform 0.2s, box-shadow 0.2s'
    },
    number: {
      fontSize: '3rem',
      color: 'var(--accent)',
      margin: '0 0 0.5rem 0'
    },
    label: {
      fontSize: '1.2rem',
      color: 'var(--text-secondary)',
      margin: 0
    },
    productsSection: {
      marginTop: '3rem'
    },
    productsList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginTop: '1.5rem'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    createButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: 'var(--success)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: 'var(--shadow)'
    }
  };
  
  if (loading) return <div style={styles.container}>Loading...</div>;
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Brand Dashboard</h1>
        <button 
          onClick={() => navigate('/brand/create-product')}
          style={styles.createButton}
        >
          + Create Product
        </button>
      </div>
      
      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={styles.number}>{stats.totalProducts}</h2>
          <p style={styles.label}>Total Products</p>
        </div>
        
        <div style={styles.card}>
          <h2 style={styles.number}>{stats.publishedProducts}</h2>
          <p style={styles.label}>Published Products</p>
        </div>
        
        <div style={styles.card}>
          <h2 style={styles.number}>{stats.archivedProducts}</h2>
          <p style={styles.label}>Archived Products</p>
        </div>
      </div>

      <div style={styles.productsSection}>
        <h2>Your Products</h2>
        <div style={styles.productsList}>
          {products.map((product) => (
            <ProductCardBrand 
              key={product._id} 
              product={product} 
              onDelete={handleDelete}
            />
          ))}
        </div>
        {products.length === 0 && <p>No products yet. Create your first product!</p>}
      </div>
    </div>
  );
};

export default BrandDashboard;
