import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Auth';
import PrivateRoute from './PrivateRoute';

const App = () => (
    <div className="container">
        <h1>Car Maintenance</h1>
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<p>Theres nothing here: 404!</p>} />
        </Routes>
    </div>
);

export default App;
