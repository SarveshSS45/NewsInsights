import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        // Clear notification after 3 seconds
        setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            if (response.ok) {
                showNotification(data.message, 'success');
                localStorage.setItem('token', data.token);
                // Delay redirect to show the success message
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                showNotification(data.message || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('An error occurred. Please try again.', 'error');
        }
    };

    return (
        <>
            {/* Notification */}
            {notification.message && (
                <div
                    className={`fixed top-4 left-4 z-50 p-4 rounded-lg shadow-lg ${
                        notification.type === 'success'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                    } transition-all duration-300 ease-in-out`}
                >
                    {notification.message}
                </div>
            )}

            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
                <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Welcome Back to NewsInsight
                        </h1>
                        <p className="mt-2 text-gray-400">
                            Please sign in to your account
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="text-gray-300">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-gray-300">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-400">
                                    Remember me
                                </label>
                            </div>
                            <button type="button" className="text-sm text-blue-400 hover:text-blue-500">
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                            Sign in
                        </button>

                        <p className="text-center text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-blue-400 hover:text-blue-500">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;