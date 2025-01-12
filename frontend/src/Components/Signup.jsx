import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
    
        if (formData.password !== formData.confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            if (response.ok) {
                showNotification(data.message, 'success');
                // Delay redirect to show success message
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
            } else {
                showNotification(data.message || 'Signup failed', 'error');
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
                            Join NewsInsight
                        </h1>
                        <p className="mt-2 text-gray-400">
                            Create your account to get started
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="text-gray-300">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your full name"
                                />
                            </div>
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
                                    placeholder="Create a password"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="text-gray-300">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Confirm your password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                                I agree to the{' '}
                                <button type="button" className="text-blue-400 hover:text-blue-500">
                                    Terms and Conditions
                                </button>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                            Create Account
                        </button>

                        <p className="text-center text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-400 hover:text-blue-500">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;