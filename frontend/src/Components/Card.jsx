import React from 'react';

const Card = ({ data }) => {
    return (
        <div className='cardContainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
            {data.map((curItem, index) => {
                if (!curItem.urlToImage) {
                    return null;
                }
                return (
                    <div key={index} className='relative group'>
                        {/* Backlight glow effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                        
                        {/* Card content */}
                        <div className='relative card bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl rounded-xl overflow-hidden border border-gray-700 group-hover:border-gray-600 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-105'>
                            <div className="overflow-hidden">
                                <img 
                                    src={curItem.urlToImage} 
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
                                    alt={curItem.title}
                                />
                            </div>
                            <div className='content p-5'>
                                <button
                                    className='title text-lg font-semibold text-gray-100 hover:text-blue-400 transition-colors duration-300 text-left'
                                    onClick={() => window.open(curItem.url)}
                                >
                                    {curItem.title}
                                </button>
                                <p className="mt-3 text-sm text-gray-400 line-clamp-3">{curItem.description}</p>
                                <button 
                                    onClick={() => window.open(curItem.url)} 
                                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Card;