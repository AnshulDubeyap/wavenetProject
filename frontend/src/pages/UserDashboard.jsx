import { useEffect, useState } from 'react'
import api from '../api/client'
import UserFilters from '../components/UserFilters'
import UserForm from '../components/UserForm'
import UserTable from '../components/UserTable'

function UserDashboard() {
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('USER') // <-- added role state
    const [searchText, setSearchText] = useState('')
    const [filterRole, setFilterRole] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            setLoading(true)
            setError('')

            // backend no longer uses pagination; only send relevant query params
            const params = {}
            if (searchText) params.search = searchText
            if (filterRole) params.role = filterRole

            const { data } = await api.get('/users', { params })
            setUsers(data.users || [])
        } catch (err) {
            const message = err?.response?.data?.message || 'Failed to load users'
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = async (event) => {
        event.preventDefault()

        if (!name || !email || !password || !role) {
            setError('Name, email, password and role are required.')
            return
        }

        try {
            setError('')
            await api.post('/users', {
                name,
                email,
                password,
                role, // <-- send role to backend
            })

            setName('')
            setEmail('')
            setPassword('')
            setRole('USER')

            await loadUsers()
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                'Failed to create user. ' +
                (err.response?.status === 403
                    ? 'You may not have permission to create users.'
                    : '')
            setError(message)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return
        }

        try {
            setError('')
            const { data } = await api.delete('/users', {
                data: { ids: [id] },
            })

            if (data.deletedCount === 0) {
                setError('You do not have permission to delete this user.')
                return
            }

            await loadUsers()
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                'Failed to delete user. ' +
                (err.response?.status === 403
                    ? 'You may not have permission to delete users.'
                    : '')
            setError(message)
        }
    }

    const handleUpdateRole = async (id) => {
        const input = prompt('Enter new role (ADMIN, UNIT_MANAGER, USER)')
        if (!input) return

        // sanitize input: collapse whitespace to underscore and uppercase
        const newRole = input.trim().toUpperCase().replace(/\s+/g, '_')
        if (!['ADMIN', 'UNIT_MANAGER', 'USER'].includes(newRole)) {
            setError('Invalid role. Use ADMIN, UNIT_MANAGER, or USER.')
            return
        }

        try {
            setError('')
            await api.patch(`/users/${id}`, { role: newRole })
            await loadUsers()
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                'Failed to update role. ' +
                (err.response?.status === 403
                    ? 'You may not have permission to update this user.'
                    : '')
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
            <h2 style={styles.header}>User Dashboard</h2>
            {error && <div style={styles.error}>{error}</div>}
            <UserFilters
                searchText={searchText}
                onSearchTextChange={setSearchText}
                filterRole={filterRole}
                onFilterRoleChange={setFilterRole}
                onApply={loadUsers}
            />

            <div style={styles.card}>
                <UserForm
                    name={name}
                    onNameChange={setName}
                    email={email}
                    onEmailChange={setEmail}
                    password={password}
                    onPasswordChange={setPassword}
                    role={role}
                    onRoleChange={setRole}
                    onSubmit={handleCreate}
                />
            </div>

            <UserTable
                users={users}
                loading={loading}
                error={error}
                onChangeRole={handleUpdateRole}
                onDelete={handleDelete}
            />
        </div>
    )
}

export default UserDashboard
