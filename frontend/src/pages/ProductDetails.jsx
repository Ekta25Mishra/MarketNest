import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI } from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await productAPI.getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={styles.container}>Loading...</div>;
  if (!product) return <div style={styles.container}>Product not found</div>;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.imageSection}>
          {product.images && product.images.length > 0 && (
            <img 
              src={product.images[0]} 
              alt={product.name} 
              style={styles.image}
            />
          )}
        </div>
        
        <div style={styles.details}>
          <h1>{product.name}</h1>
          <p style={styles.category}>{product.category}</p>
          <p style={styles.price}>${product.price}</p>
          <p style={styles.description}>{product.description}</p>
          
          {product.brandId && (
            <div style={styles.brand}>
              <h3>Brand Information</h3>
              <p>Name: {product.brandId.name}</p>
              <p>Email: {product.brandId.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem'
  },
  imageSection: {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 'auto'
  },
  details: {
    padding: '1rem'
  },
  category: {
    color: '#666',
    fontSize: '1.1rem',
    marginBottom: '1rem'
  },
  price: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: '1rem'
  },
  description: {
    lineHeight: '1.6',
    marginBottom: '2rem'
  },
  brand: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px'
  }
};

export default ProductDetails;
