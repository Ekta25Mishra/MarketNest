import { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchFilters from '../components/SearchFilters';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: '-createdAt'
  });

  useEffect(() => {
    fetchProducts();
  }, [page, filters.category, filters.sort]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = { page, limit: 12, ...filters };
      
      const { data } = await productAPI.getProducts(params);
      setProducts(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setPage(1);
    fetchProducts();
  };

  return (
    <div style={styles.container}>
      <h1>Fashion Marketplace</h1>
      
      <SearchFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div style={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {products.length === 0 && <p>No products found</p>}

          {pagination.totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => setPage(page - 1)}
                disabled={!pagination.hasPrevPage}
                style={styles.pageButton}
              >
                Previous
              </button>
              <span>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={!pagination.hasNextPage}
                style={styles.pageButton}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  },
  searchForm: {
    display: 'flex',
    gap: '0.5rem',
    flex: 1
  },
  input: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)'
  },
  select: {
    padding: '0.75rem',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)'
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'var(--accent)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '2rem'
  },
  pageButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--accent)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default Marketplace;
