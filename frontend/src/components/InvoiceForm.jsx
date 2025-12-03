const formStyles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  title: {
    color: '#333',
    margin: '0 0 20px 0',
    fontSize: '1.4rem',
    fontWeight: '500'
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
    alignItems: 'end'
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    height: '40px',
    '&:hover': {
      backgroundColor: '#1565c0'
    }
  }
};

function InvoiceForm({
  invoiceNumber,
  onInvoiceNumberChange,
  invoiceDate,
  onInvoiceDateChange,
  invoiceAmount,
  onInvoiceAmountChange,
  customerName,
  onCustomerNameChange,
  onSubmit,
}) {
  return (
    <div style={formStyles.container}>
      <h3 style={formStyles.title}>Create New Invoice</h3>
      <form onSubmit={onSubmit} style={formStyles.form}>
        <div>
          <div style={{marginBottom: '5px', fontSize: '0.9rem', color: '#555'}}>Invoice Number</div>
          <input
            type="text"
            placeholder="e.g. INV-001"
            value={invoiceNumber}
            onChange={(e) => onInvoiceNumberChange(e.target.value)}
            style={formStyles.input}
            required
          />
        </div>
        <div>
          <div style={{marginBottom: '5px', fontSize: '0.9rem', color: '#555'}}>Date</div>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => onInvoiceDateChange(e.target.value)}
            style={formStyles.input}
            required
          />
        </div>
        <div>
          <div style={{marginBottom: '5px', fontSize: '0.9rem', color: '#555'}}>Amount</div>
          <input
            type="number"
            placeholder="0.00"
            value={invoiceAmount}
            onChange={(e) => onInvoiceAmountChange(e.target.value)}
            style={formStyles.input}
            step="0.01"
            required
          />
        </div>
        <div>
          <div style={{marginBottom: '5px', fontSize: '0.9rem', color: '#555'}}>Customer (Optional)</div>
          <input
            type="text"
            placeholder="Customer name"
            value={customerName}
            onChange={(e) => onCustomerNameChange(e.target.value)}
            style={formStyles.input}
          />
        </div>
        <button 
          type="submit" 
          style={formStyles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1565c0'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#1976d2'}
        >
          Create Invoice
        </button>
      </form>
    </div>
  )
}

export default InvoiceForm
