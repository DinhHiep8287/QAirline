import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsById } from '../services/api';

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const response = await getNewsById(id);
                setNews(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching news detail:', err);
                setError('Failed to fetch news detail');
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [id]);

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
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-red-500 text-center">{error}</div>
            <button 
                onClick={() => navigate('/')}
                className="mt-4 mx-auto block text-blue-500 hover:text-blue-700"
            >
                Back to Home
            </button>
        </div>
    );

    if (!news) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {news.pictureLink && (
                    <img 
                        src={news.pictureLink}
                        alt={news.title}
                        className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-8"
                    />
                )}
                <div className="flex items-center gap-4 mb-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(news.category)}`}>
                        {news.category}
                    </span>
                    <span className="text-gray-500">
                        {news.createdDate ? new Date(news.createdDate).toLocaleDateString('vi-VN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : 'No date'}
                    </span>
                </div>
                <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
                <div className="flex items-center text-gray-600 mb-8">
                    <span className="text-sm">By {news.author}</span>
                    {news.modifiedDate && news.modifiedDate !== news.createdDate && (
                        <span className="text-sm ml-4">
                            Updated: {new Date(news.modifiedDate).toLocaleDateString('vi-VN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    )}
                </div>
                <div className="prose max-w-none mb-8">
                    <p className="text-lg text-gray-600 mb-8">{news.summary}</p>
                    <div className="mt-4" dangerouslySetInnerHTML={{ __html: news.content }} />
                </div>
                <button 
                    onClick={() => navigate('/')}
                    className="mt-8 text-blue-500 hover:text-blue-700 flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default NewsDetail; 