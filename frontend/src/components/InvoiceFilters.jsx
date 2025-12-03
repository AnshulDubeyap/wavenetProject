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
    flexWrap: 'wrap',
    gap: '15px',
    alignItems: 'flex-end'
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    minWidth: '180px',
    flex: '1'
  },
  dateRange: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  dateGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    fontSize: '0.85rem',
    color: '#555',
    marginBottom: '4px'
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
    minWidth: '120px',
    height: '36px',
    '&:hover': {
      backgroundColor: '#1565c0'
    }
  }
};

function InvoiceFilters({
  searchNumber,
  onSearchNumberChange,
  financialYear,
  onFinancialYearChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  onApply,
}) {
  return (
    <div style={filterStyles.card}>
      <h3 style={filterStyles.title}>Invoice Filters</h3>
      <div style={filterStyles.filters}>
        <input
          type="text"
          placeholder="Invoice number"
          value={searchNumber}
          onChange={(e) => onSearchNumberChange(e.target.value)}
          style={filterStyles.input}
        />
        <input
          type="text"
          placeholder="Financial Year (e.g. 2024-2025)"
          value={financialYear}
          onChange={(e) => onFinancialYearChange(e.target.value)}
          style={filterStyles.input}
        />
        <div style={filterStyles.dateRange}>
          <div style={filterStyles.dateGroup}>
            <label style={filterStyles.label}>From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => onFromDateChange(e.target.value)}
              style={filterStyles.input}
            />
          </div>
          <div style={filterStyles.dateGroup}>
            <label style={filterStyles.label}>To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => onToDateChange(e.target.value)}
              style={filterStyles.input}
            />
          </div>
        </div>
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

export default InvoiceFilters
