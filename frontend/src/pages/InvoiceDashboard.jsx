import { useEffect, useState } from 'react'
import api from '../api/client'
import InvoiceFilters from '../components/InvoiceFilters'
import InvoiceForm from '../components/InvoiceForm'
import InvoiceTable from '../components/InvoiceTable'

function InvoiceDashboard() {
  const [invoices, setInvoices] = useState([])
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [invoiceAmount, setInvoiceAmount] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [searchNumber, setSearchNumber] = useState('')
  const [financialYear, setFinancialYear] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadInvoices()
  }, [])

  async function loadInvoices() {
    try {
      setLoading(true)
      setError('')

      const params = {
        page: 1,
        limit: 20,
      }

      if (searchNumber) {
        params.search = searchNumber
      }

      if (financialYear) {
        params.fy = financialYear
      }

      if (fromDate) {
        params.startDate = fromDate
      }

      if (toDate) {
        params.endDate = toDate
      }

      const { data } = await api.get('/invoices', { params })
      setInvoices(data.invoices || [])
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to load invoices'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      setError('')
      await api.post('/invoices', {
        invoiceNumber: Number(invoiceNumber),
        date: invoiceDate,
        amount: Number(invoiceAmount),
        customerName,
      })

      setInvoiceNumber('')
      setInvoiceDate('')
      setInvoiceAmount('')
      setCustomerName('')

      await loadInvoices()
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to create invoice'
      setError(message)
    }
  }

  const handleDelete = async (invoiceNum) => {
    try {
      setError('')
      await api.delete('/invoices', {
        data: { invoiceNumbers: [invoiceNum] },
      })
      await loadInvoices()
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to delete invoice'
      setError(message)
    }
  }

  const handleUpdate = async (invoiceNum) => {
    const updatedAmount = prompt('Enter new invoice amount')
    if (!updatedAmount) return

    try {
      setError('')
      await api.patch(`/invoices/${invoiceNum}`, {
        amount: Number(updatedAmount),
      })
      await loadInvoices()
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to update invoice'
      setError(message)
    }
  }

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      color: '#333',
      borderBottom: '2px solid #eee',
      paddingBottom: '10px',
      marginBottom: '20px'
    },
    error: {
      color: '#d32f2f',
      backgroundColor: '#fde7e9',
      padding: '10px',
      borderRadius: '4px',
      margin: '10px 0'
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '20px',
      margin: '20px 0'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Invoice Dashboard</h2>
      {error && <div style={styles.error}>{error}</div>}
      <div style={styles.card}>
        <InvoiceFilters
          searchNumber={searchNumber}
          onSearchNumberChange={setSearchNumber}
          financialYear={financialYear}
          onFinancialYearChange={setFinancialYear}
          fromDate={fromDate}
          onFromDateChange={setFromDate}
          toDate={toDate}
          onToDateChange={setToDate}
          onApply={loadInvoices}
        />
      </div>

      <div style={styles.card}>
        <InvoiceForm
          invoiceNumber={invoiceNumber}
          onInvoiceNumberChange={setInvoiceNumber}
          invoiceDate={invoiceDate}
          onInvoiceDateChange={setInvoiceDate}
          customerName={customerName}
          onCustomerNameChange={setCustomerName}
          invoiceAmount={invoiceAmount}
          onInvoiceAmountChange={setInvoiceAmount}
          onSubmit={handleCreate}
        />
      </div>

      <InvoiceTable
        invoices={invoices}
        loading={loading}
        error={error}
        onEdit={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default InvoiceDashboard
