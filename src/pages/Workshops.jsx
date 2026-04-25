import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { fetchData, API_ENDPOINTS } from '../utils/api';

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const result = await fetchData(API_ENDPOINTS.WORKSHOPS);
        setWorkshops(result?.data || []);
      } catch (err) {
        setError('Failed to load workshops. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getWorkshops();
  }, []);

  return (
    <>
      <div className="section" style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: '80vh' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Workshops</h2>
        <p style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 3rem' }}>
          Hands-on, immersive workshops designed to provide deep practical learning for focused sessions.
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            Loading workshops...
          </div>
        ) : (
          <div className="workshops-grid">
            {workshops.map((ws) => (
              <div key={ws._id} className="glass-panel interactive" style={{ 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
              }}>
                <div style={{ height: '220px', width: '100%', overflow: 'hidden', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={ws.imageUrl} 
                    alt={ws.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.5s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ 
                    fontSize: '1.2rem', 
                    marginBottom: '1rem', 
                    color: 'white',
                    background: 'var(--accent-green)',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                    boxShadow: '0 4px 10px rgba(101, 169, 46, 0.3)'
                  }}>
                    {ws.title}
                  </h4>
                  <p style={{ fontSize: '1rem', flex: 1, margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{ws.description}</p>
                  <a href={`https://wa.me/201140866774?text=Hi, Im interested in booking the ${ws.title} workshop.`} target="_blank" rel="noopener noreferrer" className="btn-primary product-btn-green" style={{ 
                       width: '100%', 
                       padding: '0.8rem', 
                       fontSize: '1rem', 
                       gap: '0.5rem', 
                       justifyContent: 'center',
                       background: 'linear-gradient(135deg, #28a745, #218838)',
                       border: 'none',
                       boxShadow: '0 4px 15px rgba(40, 167, 69, 0.4)',
                       display: 'flex',
                       alignItems: 'center'
                     }}>
                    <FaWhatsapp size={18} /> Book Workshop
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .workshops-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        @media (max-width: 1024px) {
          .workshops-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
        @media (max-width: 768px) {
          .workshops-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
