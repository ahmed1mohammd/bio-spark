import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Send, Dna } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await axios.post('http://localhost:5000/api/messages', formData);
      
      if (response.data.success) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', message: '' });
        
        setTimeout(() => {
          setStatus(prev => ({ ...prev, success: false }));
        }, 5000);
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus({
        submitting: false,
        success: false,
        error: err.response?.data?.error || 'Something went wrong. Please try again.'
      });
    }
  };

  return (
    <section id="contact" className="contact-section">
      {/* Flying DNA Helix Background */}
      <div className="dna-helix-container left">
        <div className="helix">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="dot" style={{ '--i': i }}></div>
          ))}
        </div>
      </div>

      <div className="dna-helix-container right">
        <div className="helix">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="dot" style={{ '--i': i }}></div>
          ))}
        </div>
      </div>
      
      <div className="dna-background">
        <div className="dna-strand dna-1"></div>
        <div className="dna-strand dna-2"></div>
        <div className="dna-strand dna-3"></div>
      </div>
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get in <span className="highlight">Touch</span></h2>
          <div className="title-underline"></div>
        </div>

        <div className="contact-grid">
          <div className="contact-info-panel glass-panel">
            <div className="info-content">
              <div className="dna-icon-float">
                <Dna size={48} className="dna-svg" />
              </div>
              <h3>Contact Information</h3>
              <p>
                Ready to revolutionize your research? Reach out to our team of experts and let's build the future of biotechnology together.
              </p>
              
              <div className="contact-details">
                <div className="detail-card">
                  <div className="icon-box">
                    <Mail size={24} />
                  </div>
                  <div className="detail-text">
                    <span>Email Us</span>
                    <p>biospark225@gmail.com</p>
                  </div>
                </div>
                
                <div className="detail-card">
                  <div className="icon-box">
                    <Phone size={24} />
                  </div>
                  <div className="detail-text">
                    <span>Call Us</span>
                    <p>+20 11 40866774</p>
                  </div>
                </div>
                
                <div className="detail-card">
                  <div className="icon-box">
                    <MapPin size={24} />
                  </div>
                  <div className="detail-text">
                    <span>Visit Us</span>
                    <p>Cairo, Egypt</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                {/* Social icons could go here */}
              </div>
            </div>
          </div>

          <div className="contact-form-panel glass-panel">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <div className="input-wrapper">
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell us about your project or inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary submit-btn" 
                disabled={status.submitting}
              >
                {status.submitting ? (
                  'Sending...'
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} className="send-icon" />
                  </>
                )}
              </button>

              {status.success && (
                <div className="status-alert success">
                  <div className="alert-icon">✓</div>
                  <div className="alert-content">
                    <h4>Success!</h4>
                    <p>Your message has been sent. Our team will contact you shortly.</p>
                  </div>
                </div>
              )}
              
              {status.error && (
                <div className="status-alert error">
                  <div className="alert-icon">!</div>
                  <div className="alert-content">
                    <h4>Error</h4>
                    <p>{status.error}</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
