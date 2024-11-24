import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const getRoleFromToken = () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.role_id;
    } catch (error) {
        console.error('Token decoding failed:', error);
        return null;
    }
};

const ProtectedRoute = ({ children, role }) => {
    const userRole = getRoleFromToken();

    if (!userRole || userRole !== role) {
        console.log('Unauthorized access. Redirecting to /login');
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
