const API_BASE_URL = 'http://localhost:5000/api';

export const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Something went wrong');
        }
        
        return result;
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
};

export const API_ENDPOINTS = {
    PRODUCTS: '/products',
    WORKSHOPS: '/workshops',
    EVENTS: '/events',
    ARTICLES: '/articles',
    CUSTOMERS: '/customers',
    REVIEWS: '/reviews',
    VISITORS: '/visitors'
};
