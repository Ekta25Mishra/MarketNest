import { useNavigate } from 'react-router-dom';

const ProductCardBrand = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const styles = {
    card: {
      backgroundColor: 'var(--bg-card)',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    },
    cardHover: {
      transform: 'translateY(-4px)',
      boxShadow: 'var(--shadow-hover)'
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
      color: 'var(--text-primary)',
      fontWeight: '600'
    },
    price: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: 'var(--success)',
      margin: '0 0 0.5rem 0'
    },
    status: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.85rem',
      fontWeight: '500',
      marginBottom: '1rem'
    },
    statusPublished: {
      backgroundColor: '#d4edda',
      color: '#155724'
    },
    statusDraft: {
      backgroundColor: '#fff3cd',
      color: '#856404'
    },
    statusArchived: {
      backgroundColor: '#f8d7da',
      color: '#721c24'
    },
    actions: {
      display: 'flex',
      gap: '0.5rem'
    },
    editButton: {
      flex: 1,
      padding: '0.5rem',
      backgroundColor: 'var(--accent)',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'opacity 0.2s'
    },
    deleteButton: {
      flex: 1,
      padding: '0.5rem',
      backgroundColor: 'var(--danger)',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'opacity 0.2s'
    }
  };

  const getStatusStyle = () => {
    switch (product.status) {
      case 'published':
        return styles.statusPublished;
      case 'draft':
        return styles.statusDraft;
      case 'archived':
        return styles.statusArchived;
      default:
        return styles.statusDraft;
    }
  };

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
        <p style={styles.price}>${product.price}</p>
        <span style={{ ...styles.status, ...getStatusStyle() }}>
          {product.status}
        </span>
        <div style={styles.actions}>
          <button 
            onClick={() => navigate(`/brand/edit-product/${product._id}`)}
            style={styles.editButton}
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(product._id)}
            style={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardBrand;
