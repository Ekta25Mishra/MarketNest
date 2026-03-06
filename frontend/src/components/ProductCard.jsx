import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      {product.images && product.images.length > 0 && (
        <img 
          src={product.images[0]} 
          alt={product.name} 
          style={styles.image}
        />
      )}
      <div style={styles.content}>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.category}>{product.category}</p>
        <p style={styles.price}>${product.price}</p>
        <Link to={`/products/${product._id}`} style={styles.link}>
          View Details
        </Link>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: 'var(--bg-card)',
    boxShadow: 'var(--shadow)',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  content: {
    padding: '1rem'
  },
  title: {
    fontSize: '1.2rem',
    margin: '0 0 0.5rem 0',
    color: 'var(--text-primary)'
  },
  category: {
    color: 'var(--text-secondary)',
    margin: '0 0 0.5rem 0'
  },
  price: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: 'var(--success)',
    margin: '0 0 1rem 0'
  },
  link: {
    display: 'inline-block',
    backgroundColor: 'var(--accent)',
    color: 'white',
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    borderRadius: '6px',
    transition: 'background-color 0.2s'
  }
};

export default ProductCard;
