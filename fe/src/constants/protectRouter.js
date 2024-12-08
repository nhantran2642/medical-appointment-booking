import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Hàm để lấy role từ token
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

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const userRole = getRoleFromToken();

    // Kiểm tra nếu không có userRole hoặc userRole không thuộc mảng allowedRoles
    if (!userRole || !Array.isArray(allowedRoles) || !allowedRoles.includes(userRole)) {
        console.log('Unauthorized access. Redirecting to /login');
        return <Navigate to="/login" replace />;
    }

    // Nếu userRole hợp lệ, hiển thị các children
    return children;
};

export default ProtectedRoute;
