const tableStyles = {
  container: {
    width: '100%',
    overflowX: 'auto',
    marginTop: '20px'
  },
  title: {
    color: '#333',
    margin: '0 0 15px 0',
    fontSize: '1.2rem',
    fontWeight: '500'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '15px 0',
    fontSize: '0.9em',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)'
  },
  th: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    textAlign: 'left',
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    fontWeight: '500',
    fontSize: '0.9em',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #eee',
    verticalAlign: 'middle'
  },
  tr: {
    '&:hover': {
      backgroundColor: '#f9f9f9'
    }
  },
  actionButton: {
    padding: '6px 12px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85em',
    transition: 'background-color 0.2s'
  },
  firstButton: {
    marginLeft: 0
  },
  lastButton: {
    marginRight: 0
  },
  editButton: {
    backgroundColor: '#2196f3',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1976d2'
    }
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    '&:hover': {
      backgroundColor: '#d32f2f'
    }
  },
  loading: {
    padding: '20px',
    textAlign: 'center',
    color: '#666'
  },
  noData: {
    padding: '20px',
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic'
  },
  error: {
    color: '#d32f2f',
    backgroundColor: '#fde7e9',
    padding: '10px 15px',
    borderRadius: '4px',
    margin: '10px 0'
  }
};

function InvoiceTable({ invoices, loading, error, onEdit, onDelete }) {
  return (
    <div style={tableStyles.container}>
      <h3 style={tableStyles.title}>Invoices</h3>
      {error && <div style={tableStyles.error}>{error}</div>}
      {loading ? (
        <div style={tableStyles.loading}>Loading invoices...</div>
      ) : invoices.length === 0 ? (
        <div style={tableStyles.noData}>No invoices found. Create your first invoice to get started.</div>
      ) : (
        <div style={{overflowX: 'auto'}}>
          <table style={tableStyles.table}>
            <thead>
              <tr>
                <th style={tableStyles.th}>Invoice #</th>
                <th style={tableStyles.th}>Date</th>
                <th style={tableStyles.th}>Amount</th>
                <th style={tableStyles.th}>FY</th>
                <th style={{...tableStyles.th, textAlign: 'center'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice._id} style={tableStyles.tr}>
                  <td style={tableStyles.td}><strong>{invoice.invoiceNumber}</strong></td>
                  <td style={tableStyles.td}>{invoice.date ? new Date(invoice.date).toLocaleDateString() : 'N/A'}</td>
                  <td style={tableStyles.td}>
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      minimumFractionDigits: 2
                    }).format(invoice.amount || 0)}
                  </td>
                  <td style={tableStyles.td}>{invoice.financialYear || 'N/A'}</td>
                  <td style={{...tableStyles.td, whiteSpace: 'nowrap'}}>
                    <button
                      style={{
                        ...tableStyles.actionButton, 
                        ...tableStyles.editButton,
                        ...tableStyles.firstButton
                      }}
                      onClick={() => onEdit(invoice.invoiceNumber)}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#1976d2'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#2196f3'}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        ...tableStyles.actionButton, 
                        ...tableStyles.deleteButton,
                        ...tableStyles.lastButton
                      }}
                      onClick={() => onDelete(invoice.invoiceNumber)}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#d32f2f'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default InvoiceTable
