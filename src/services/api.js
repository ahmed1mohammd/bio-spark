import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('biospark_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;

// Public Endpoints
export const fetchSiteContent = () => api.get('/content');
export const fetchPrograms = (params) => api.get('/programs', { params });
export const fetchWorkshops = (params) => api.get('/workshops', { params });
export const fetchWorkshopBySlug = (idOrSlug) => api.get(`/workshops/${idOrSlug}`);
export const fetchCamps = (params) => api.get('/camps', { params });
export const fetchCampBySlug = (idOrSlug) => api.get(`/camps/${idOrSlug}`);
export const fetchProducts = (params) => api.get('/products', { params });
export const fetchProductBySlug = (idOrSlug) => api.get(`/products/${idOrSlug}`);
export const fetchGallery = (params) => api.get('/gallery', { params });
export const fetchCustomers = () => api.get('/customers');
export const fetchTestimonials = (params) => api.get('/testimonials', { params });
export const fetchBoardMembers = () => api.get('/board-members');
export const fetchCarousels = (params) => api.get('/carousels', { params });

// Inquiry Submissions
export const submitSchoolInquiry = (data) => api.post('/inquiries/school', data);
export const submitContactForm = (data) => api.post('/inquiries/contact', data);

// Auth
export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const getAdminProfile = () => api.get('/auth/profile');

// Admin CRUD Endpoints
export const fetchDashboardStats = () => api.get('/dashboard/stats');
export const updateSiteContent = (data) => api.put('/content', data);

// Generic Admin API calls
export const createItem = (resource, data) => api.post(`/${resource}`, data);
export const updateItem = (resource, id, data) => api.put(`/${resource}/${id}`, data);
export const deleteItem = (resource, id) => api.delete(`/${resource}/${id}`);

// Inquiries Admin Management
export const fetchSchoolInquiries = (status) => api.get('/inquiries/school', { params: { status } });
export const updateSchoolInquiryStatus = (id, data) => api.patch(`/inquiries/school/${id}`, data);
export const deleteSchoolInquiry = (id) => api.delete(`/inquiries/school/${id}`);

export const fetchContactSubmissions = (status) => api.get('/inquiries/contact', { params: { status } });
export const updateContactStatus = (id, data) => api.patch(`/inquiries/contact/${id}`, data);
export const deleteContactSubmission = (id) => api.delete(`/inquiries/contact/${id}`);

// Image Upload
export const uploadImage = (formData) => api.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
