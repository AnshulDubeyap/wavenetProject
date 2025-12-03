const filterStyles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '20px',
    marginBottom: '20px'
  },
  title: {
    color: '#333',
    margin: '0 0 15px 0',
    fontSize: '1.2rem',
    fontWeight: '500'
  },
  filters: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    minWidth: '200px',
    flex: '1'
  },
  select: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: 'white',
    cursor: 'pointer',
    minWidth: '150px'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    '&:hover': {
      backgroundColor: '#1565c0'
    }
  }
};

function UserFilters({ searchText, onSearchTextChange, filterRole, onFilterRoleChange, onApply }) {
  return (
    <div style={filterStyles.card}>
      <h3 style={filterStyles.title}>Filters</h3>
      <div style={filterStyles.filters}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
          style={filterStyles.input}
        />
        <select
          value={filterRole}
          onChange={(e) => onFilterRoleChange(e.target.value)}
          style={filterStyles.select}
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="UNIT_MANAGER">Unit Manager</option>
          <option value="USER">User</option>
        </select>
        <button 
          type="button" 
          style={filterStyles.button} 
          onClick={onApply}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1565c0'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#1976d2'}
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}

export default UserFilters
