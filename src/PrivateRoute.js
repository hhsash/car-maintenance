/* eslint-disable react/function-component-definition */
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    return localStorage.getItem('token') ? (
        children
    ) : (
        <Navigate to="/login" replace />
    );
}
export default PrivateRoute;
