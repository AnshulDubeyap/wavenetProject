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
  changeRoleButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    '&:hover': {
      backgroundColor: '#388e3c'
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

function UserTable({ users, loading, error, onChangeRole, onDelete }) {
  return (
    <div style={tableStyles.container}>
      <h3 style={tableStyles.title}>Users</h3>
      {error && <div style={tableStyles.error}>{error}</div>}
      {loading ? (
        <div style={tableStyles.loading}>Loading users...</div>
      ) : users.length === 0 ? (
        <div style={tableStyles.noData}>No users found.</div>
      ) : (
        <div style={{overflowX: 'auto'}}>
          <table style={tableStyles.table}>
            <thead>
              <tr>
                <th style={tableStyles.th}>User ID</th>
                <th style={tableStyles.th}>Name</th>
                <th style={tableStyles.th}>Email</th>
                <th style={tableStyles.th}>Role</th>
                <th style={{...tableStyles.th, textAlign: 'center'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} style={tableStyles.tr}>
                  <td style={tableStyles.td}><code>{user.userId || 'N/A'}</code></td>
                  <td style={tableStyles.td}><strong>{user.name}</strong></td>
                  <td style={tableStyles.td}>{user.email}</td>
                  <td style={tableStyles.td}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      backgroundColor: user.role === 'ADMIN' ? '#e3f2fd' : 
                                      user.role === 'UNIT_MANAGER' ? '#e8f5e9' : '#f5f5f5',
                      color: user.role === 'ADMIN' ? '#1565c0' : 
                            user.role === 'UNIT_MANAGER' ? '#2e7d32' : '#424242',
                      fontSize: '0.8em',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}>
                      {user.role?.toLowerCase().replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{...tableStyles.td, whiteSpace: 'nowrap'}}>
                    <button
                      style={{
                        ...tableStyles.actionButton,
                        ...tableStyles.changeRoleButton,
                        marginRight: '8px'
                      }}
                      onClick={() => onChangeRole(user._id)}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#388e3c'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#4caf50'}
                    >
                      Change Role
                    </button>
                    <button
                      style={{
                        ...tableStyles.actionButton,
                        ...tableStyles.deleteButton
                      }}
                      onClick={() => onDelete(user._id)}
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

export default UserTable
