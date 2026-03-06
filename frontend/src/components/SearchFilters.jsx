const SearchFilters = ({ filters, onFilterChange, onSearch }) => {
  const styles = {
    container: {
      backgroundColor: 'var(--bg-card)',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: 'var(--shadow)',
      marginBottom: '2rem'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '1rem'
    },
    searchRow: {
      display: 'flex',
      gap: '0.5rem'
    },
    input: {
      flex: 1,
      padding: '0.75rem',
      border: '1px solid var(--border-color)',
      borderRadius: '6px',
      backgroundColor: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      fontSize: '1rem'
    },
    select: {
      padding: '0.75rem',
      border: '1px solid var(--border-color)',
      borderRadius: '6px',
      backgroundColor: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      fontSize: '1rem'
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: 'var(--accent)',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'opacity 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchRow}>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          style={styles.input}
        />
        <button onClick={onSearch} style={styles.button}>
          Search
        </button>
      </div>

      <div style={styles.row}>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          style={styles.select}
        >
          <option value="">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Accessories">Accessories</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => onFilterChange('minPrice', e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          style={styles.input}
        />

        <select
          value={filters.sort}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          style={styles.select}
        >
          <option value="-createdAt">Newest First</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;
