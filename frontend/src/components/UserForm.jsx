const formStyles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto'
    },
    title: {
        color: '#333',
        marginBottom: '20px',
        fontSize: '1.5rem',
        fontWeight: '500'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    input: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        width: '100%',
        boxSizing: 'border-box'
    },
    select: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        backgroundColor: 'white',
        cursor: 'pointer',
        width: '100%',
        boxSizing: 'border-box'
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        marginTop: '10px',
        width: '150px',
        alignSelf: 'flex-start'
    },
    buttonHover: {
        backgroundColor: '#1565c0'
    }
};

function UserForm({
    name,
    onNameChange,
    email,
    onEmailChange,
    password,
    onPasswordChange,
    role,
    onRoleChange,
    onSubmit,
}) {
    return (
        <div style={formStyles.container}>
            <h3 style={formStyles.title}>Create New User</h3>
            <form onSubmit={onSubmit} style={formStyles.form}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    style={formStyles.input}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    style={formStyles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    style={formStyles.input}
                    required
                />

                <select
                    value={role}
                    onChange={(e) => onRoleChange(e.target.value)}
                    style={formStyles.select}
                    required
                >
                    <option value="">Select a role</option>
                    <option value="USER">User</option>
                    <option value="UNIT_MANAGER">Unit Manager</option>
                    <option value="ADMIN">Administrator</option>
                </select>

                <button 
                    type="submit" 
                    style={formStyles.button}
                    onMouseOver={(e) => e.target.style.backgroundColor = formStyles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = formStyles.button.backgroundColor}
                >
                    Add User
                </button>
            </form>
        </div>
    )
}

export default UserForm
