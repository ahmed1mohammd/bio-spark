import React, { useState, useEffect } from 'react';
import { fetchData, API_ENDPOINTS } from '../utils/api';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClients = async () => {
      try {
        const result = await fetchData(API_ENDPOINTS.CUSTOMERS);
        setClients(result?.data || []);
      } catch (err) {
        console.error('Failed to load clients:', err);
      } finally {
        setLoading(false);
      }
    };
    getClients();
  }, []);

  return (
    <div className="section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
        <h5 style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Trusted By Schools
        </h5>
        <h2 style={{ marginBottom: '3rem', fontSize: '2rem' }}>Our Partners</h2>

        {loading ? (
          <div style={{ color: 'var(--text-secondary)' }}>Loading partners...</div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
            gap: '2.5rem',
            alignItems: 'center',
            justifyItems: 'center'
          }}>
            {clients.map((client) => (
              <div key={client._id} className="client-logo">
                <img 
                  src={client.imageUrl} 
                  alt="Partner Logo" 
                  style={{ width: '100%', maxWidth: '120px', height: 'auto', objectFit: 'contain' }} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <style>{`
        .client-logo {
          color: rgba(255, 255, 255, 0.4);
          filter: grayscale(100%);
          transition: all 0.4s ease;
          cursor: crosshair;
          border-bottom: 2px solid transparent;
          padding-bottom: 0.5rem;
        }
        .client-logo:hover {
          color: white;
          filter: grayscale(0%);
          transform: scale(1.1);
          border-color: var(--accent-cyan);
          text-shadow: 0 0 15px rgba(76, 214, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
