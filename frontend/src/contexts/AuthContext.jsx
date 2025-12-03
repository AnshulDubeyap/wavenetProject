import { createContext, useEffect, useState } from 'react';
import api from '../api/client';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const timezoneOffsetMinutes = new Date().getTimezoneOffset();
            const { data } = await api.post('/auth/login', {
                email,
                password,
                timezoneOffsetMinutes,
            });
            setUser(data.user);
            return data.user;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } finally {
            setUser(null); // 🚨 DO NOT navigate here
        }
    };

    useEffect(() => {
        async function loadUser() {
            try {
                const { data } = await api.get('/auth/me');
                setUser(data.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
