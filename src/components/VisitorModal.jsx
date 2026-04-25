import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaTimes, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { API_ENDPOINTS } from '../utils/api';

export default function VisitorModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    useEffect(() => {
        const hasSubmitted = localStorage.getItem('biospark_visitor_submitted');
        if (!hasSubmitted) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 5000); // Show after 5 seconds
            return () => clearTimeout(timer);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await axios.post(`http://localhost:5000/api${API_ENDPOINTS.VISITORS}`, { email });
            setStatus('success');
            setMessage('Thank you for joining our community!');
            localStorage.setItem('biospark_visitor_submitted', 'true');
            setTimeout(() => {
                setIsOpen(false);
            }, 3000);
        } catch (err) {
            setStatus('error');
            setMessage(err.response?.data?.error || 'Something went wrong. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="visitor-modal-overlay">
            <div className="visitor-modal-content">
                <button className="close-btn" onClick={() => setIsOpen(false)}>
                    <FaTimes />
                </button>

                <div className="modal-header">
                    <div className="icon-wrapper">
                        <FaEnvelope />
                    </div>
                    <h2>Join the BioSpark Journey</h2>
                    <p>Subscribe to stay updated with our latest experiments, workshops, and scientific events.</p>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    {status === 'success' ? (
                        <div className="success-message">
                            <FaCheckCircle className="success-icon" />
                            <p>{message}</p>
                        </div>
                    ) : (
                        <>
                            <div className="input-group">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={status === 'loading'}
                                />
                                {status === 'error' && <p className="error-text">{message}</p>}
                            </div>
                            <button 
                                type="submit" 
                                className={`submit-btn ${status === 'loading' ? 'loading' : ''}`}
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? <FaSpinner className="spinner" /> : 'Subscribe Now'}
                            </button>
                        </>
                    )}
                </form>

                <p className="privacy-text">We promise not to spam your inbox.</p>
            </div>

            <style>{`
                .visitor-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 7, 20, 0.85);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    animation: fadeIn 0.4s ease-out;
                }

                .visitor-modal-content {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                    padding: 3rem 2.5rem;
                    max-width: 450px;
                    width: 90%;
                    position: relative;
                    text-align: center;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .close-btn {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 1.25rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .close-btn:hover {
                    color: white;
                    transform: rotate(90deg);
                }

                .modal-header .icon-wrapper {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                    font-size: 1.8rem;
                    color: white;
                    box-shadow: 0 10px 20px rgba(0, 210, 255, 0.25);
                }

                .modal-header h2 {
                    color: white;
                    font-size: 1.75rem;
                    margin-bottom: 0.75rem;
                    font-weight: 700;
                }

                .modal-header p {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 1rem;
                    line-height: 1.5;
                    margin-bottom: 2rem;
                }

                .modal-form {
                    margin-bottom: 1.5rem;
                }

                .input-group {
                    margin-bottom: 1.25rem;
                }

                .modal-form input {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 1rem 1.25rem;
                    color: white;
                    font-size: 1rem;
                    transition: all 0.3s;
                    box-sizing: border-box;
                }

                .modal-form input:focus {
                    outline: none;
                    border-color: #00d2ff;
                    background: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 0 0 4px rgba(0, 210, 255, 0.1);
                }

                .submit-btn {
                    width: 100%;
                    background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    padding: 1rem;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 10px 20px rgba(0, 210, 255, 0.2);
                }

                .submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 25px rgba(0, 210, 255, 0.3);
                }

                .submit-btn:active {
                    transform: translateY(0);
                }

                .submit-btn.loading {
                    opacity: 0.8;
                    cursor: not-allowed;
                }

                .spinner {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .success-message {
                    padding: 1rem;
                    color: #4ade80;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .success-icon {
                    font-size: 3rem;
                }

                .error-text {
                    color: #ff4b2b;
                    font-size: 0.85rem;
                    margin-top: 0.5rem;
                    text-align: left;
                }

                .privacy-text {
                    color: rgba(255, 255, 255, 0.3);
                    font-size: 0.8rem;
                }
            `}</style>
        </div>
    );
}
