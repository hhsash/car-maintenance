/* eslint-disable arrow-body-style */
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import PrivateRoute from './PrivateRoute';

const App = () => {
    return (
        <div className="container">
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route path="/login" element={<Auth />} />
                <Route path="*" element={<p>Theres nothing here: 404!</p>} />
            </Routes>
        </div>
    );
};

export default App;
