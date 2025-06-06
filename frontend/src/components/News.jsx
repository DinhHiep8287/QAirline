import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNews } from '../services/api';

const News = () => {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await getNews(0, 6); // Lấy 6 tin tức mới nhất
                const newsData = response?.data || [];
                setNews(Array.isArray(newsData) ? newsData : []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching news:', err);
                setError('Failed to fetch news');
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const handleReadMore = (id) => {
        navigate(`/news/${id}`);
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'NEWS':
                return 'bg-blue-100 text-blue-800';
            case 'PROMOTION':
                return 'bg-green-100 text-green-800';
            case 'HELP':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="text-red-500 text-center py-4">{error}</div>
    );

    if (!news || news.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No news available at the moment.</p>
            </div>
        );
    }

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Latest News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item, index) => (
                        <div key={item.id || index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            {item.pictureLink ? (
                                <img 
                                    src={item.pictureLink} 
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                                        {item.category}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {item.createdDate ? new Date(item.createdDate).toLocaleDateString('vi-VN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : 'No date'}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">{item.summary || 'No summary available'}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        By {item.author}
                                    </span>
                                    <button 
                                        className="text-blue-500 hover:text-blue-700 font-medium flex items-center"
                                        onClick={() => handleReadMore(item.id)}
                                    >
                                        Read More
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News; 