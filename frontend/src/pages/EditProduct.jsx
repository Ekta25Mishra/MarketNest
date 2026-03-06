import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { brandAPI, productAPI } from '../services/api';

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    status: 'draft'
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await productAPI.getProductById(id);
      setFormData({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        status: data.status
      });
    } catch (error) {
      setError('Failed to load product');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('status', formData.status);

      for (let i = 0; i < images.length; i++) {
        formDataToSend.append('images', images[i]);
      }

      await brandAPI.updateProduct(id, formDataToSend);
      setSuccess('Product updated successfully!');
      setTimeout(() => navigate('/brand/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem'
    },
    formBox: {
      backgroundColor: 'var(--bg-card)',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: 'var(--shadow)'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    input: {
      padding: '0.75rem',
      border: '1px solid var(--border-color)',
      borderRadius: '6px',
      fontSize: '1rem',
      backgroundColor: 'var(--bg-secondary)',
      color: 'var(--text-primary)'
    },
    textarea: {
      padding: '0.75rem',
      border: '1px solid var(--border-color)',
      borderRadius: '6px',
      fontSize: '1rem',
      minHeight: '100px',
      resize: 'vertical',
      backgroundColor: 'var(--bg-secondary)',
      color: 'var(--text-primary)'
    },
    button: {
      padding: '0.75rem',
      backgroundColor: 'var(--accent)',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      cursor: 'pointer'
    },
    error: {
      backgroundColor: '#fee',
      color: '#c33',
      padding: '0.75rem',
      borderRadius: '6px',
      marginBottom: '1rem'
    },
    success: {
      backgroundColor: '#efe',
      color: '#3c3',
      padding: '0.75rem',
      borderRadius: '6px',
      marginBottom: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1>Edit Product</h1>
        
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={styles.input}
            required
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={styles.textarea}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            style={styles.input}
            required
          />

          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            style={styles.input}
            required
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Accessories">Accessories</option>
          </select>

          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            style={styles.input}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(Array.from(e.target.files))}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
