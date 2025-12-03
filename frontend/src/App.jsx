import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import InvoiceDashboard from './pages/InvoiceDashboard';
import UserDashboard from './pages/UserDashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import './App.css';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/invoices" replace />} />
          <Route path="invoices" element={<InvoiceDashboard />} />
          <Route path="users" element={<UserDashboard />} />
        </Route>
      </Route>
      
      {/* 404 - Not Found */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
