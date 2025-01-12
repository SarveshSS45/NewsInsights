import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from './Card';

const Newsapp = () => {
    const [search, setSearch] = useState("india");
    const [newsData, setNewsData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const API_KEY = "be99cfe240c84e6d9f633cc5406954ef";

    useEffect(() => {
        // Check if user is logged in on component mount
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const getData = useCallback(async () => {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
        const jsonData = await response.json();
        let dt = jsonData.articles.slice(0, 10);
        setNewsData(dt);
    }, [search]);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    const userInput = (event) => {
        setSearch(event.target.value);
    };

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        // Redirect to login page
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">NewsInsight</h1>
                        </div>
                        <ul className="hidden md:flex space-x-6">
                            <button className="text-gray-300 hover:text-blue-400 transition-colors font-medium">All News</button>
                            <button className="text-gray-300 hover:text-blue-400 transition-colors font-medium">Trending</button>
                        </ul>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search News"
                                    value={search}
                                    onChange={handleInput}
                                    className="w-64 pl-4 pr-10 py-2 rounded-full bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                                <button 
                                    onClick={getData} 
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-full transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex gap-3">
                                {isLoggedIn ? (
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <>
                                        <Link to="/login" className="px-4 py-2 text-gray-300 hover:text-blue-400 transition-colors">Login</Link>
                                        <Link to="/signup" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors">Sign Up</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Rest of your component remains the same */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Stay Updated with NewsInsight</h2>
                    <p className="text-gray-400">Discover the latest news from around the world</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {["sports", "politics", "entertainment", "health", "fitness"].map((category) => (
                        <button
                            key={category}
                            onClick={userInput}
                            value={category}
                            className="px-6 py-2 bg-gray-800 hover:bg-blue-500 text-gray-300 hover:text-white rounded-full shadow-md transition-colors capitalize"
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="mt-8">
                    {newsData ? <Card data={newsData} /> : 
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Newsapp;