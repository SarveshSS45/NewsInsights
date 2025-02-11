// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Newsapp from './Components/Newsapp';
import Login from './Components/Login';
import Signup from './Components/Signup';
import './index.css';
import './App.css';

function App() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Router>
                <Routes>
                    <Route path="/" element={<Newsapp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;