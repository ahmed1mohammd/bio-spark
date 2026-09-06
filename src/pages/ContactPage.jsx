import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { submitContactForm } from '../services/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      setErrorMsg(err?.response?.data?.error || 'Failed to submit contact message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="page-header">
        <div className="section">
          <h1>Contact BioSpark</h1>
          <p>Have questions about our workshops, camps, or 3D models? Reach out to our team today.</p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="contact-grid">
          {/* Info Card */}
          <div className="glass-panel info-card">
            <h2>Get in Touch</h2>
            <p>Our educational advisors and biotech specialists are here to assist you.</p>

            <div className="contact-details">
              <div className="item">
                <Mail size={24} color="#73C52A" />
                <div>
                  <strong>Email Us</strong>
                  <p>biospark225@gmail.com</p>
                </div>
              </div>

              <div className="item">
                <Phone size={24} color="#73C52A" />
                <div>
                  <strong>Call or WhatsApp</strong>
                  <p>+20 11 40866774</p>
                </div>
              </div>

              <div className="item">
                <MapPin size={24} color="#73C52A" />
                <div>
                  <strong>Location</strong>
                  <p>Cairo, Egypt</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="glass-panel form-card">
            <h2>Send Us a Message</h2>

            {submitted ? (
              <div className="success-box">
                <CheckCircle size={54} color="#73C52A" />
                <h3>Message Received!</h3>
                <p>Thank you for contacting BioSpark. We will reply to your message shortly.</p>
                <button className="btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {errorMsg && <div className="error-box">{errorMsg}</div>}

                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+20 11 40866774"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="General Inquiry / Workshop / Product"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can BioSpark help you?"
                  ></textarea>
                </div>

                <button type="submit" disabled={submitting} className="btn-primary submit-btn">
                  <Send size={18} />
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .contact-page { padding-top: 6rem; }
        .page-header { text-align: center; padding: 4rem 0 2rem; }
        .page-header h1 { font-size: clamp(2.2rem, 4vw, 3.2rem); margin-bottom: 1rem; color: #fff; }
        .page-header p { max-width: 700px; margin: 0 auto; font-size: 1.1rem; color: #CBD5E1; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 2.5rem; }
        .info-card { padding: 3rem 2.5rem; }
        .info-card h2 { text-align: left; margin-bottom: 1rem; }
        .info-card p { color: #CBD5E1; margin-bottom: 2.5rem; }
        .contact-details { display: flex; flex-direction: column; gap: 2rem; }
        .contact-details .item { display: flex; align-items: flex-start; gap: 1.2rem; }
        .contact-details strong { display: block; color: #fff; font-size: 1.05rem; }
        .contact-details p { color: #94A3B8; margin: 0.2rem 0 0; }
        .form-card { padding: 3rem 2.5rem; }
        .form-card h2 { text-align: left; margin-bottom: 2rem; }
        .contact-form { display: flex; flex-direction: column; gap: 1.2rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { color: #E2E8F0; font-weight: 600; font-size: 0.9rem; }
        .form-group input, .form-group textarea { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; padding: 0.8rem 1rem; color: #fff; font-family: inherit; font-size: 0.95rem; outline: none; }
        .form-group input:focus, .form-group textarea:focus { border-color: #73C52A; background: rgba(255,255,255,0.12); }
        .submit-btn { width: 100%; padding: 0.9rem; font-size: 1rem; gap: 0.5rem; }
        .success-box { text-align: center; padding: 3rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
        .success-box h3 { font-size: 1.8rem; color: #fff; }
        .error-box { background: rgba(239, 68, 68, 0.2); border: 1px solid #EF4444; color: #FCA5A5; padding: 0.8rem 1rem; border-radius: 8px; }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
