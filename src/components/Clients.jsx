import React from 'react';

export default function Clients() {
  const clients = [
    { id: 1, name: "Cambridge Academy", initials: "CA" },
    { id: 2, name: "Oxford Int.", initials: "OI" },
    { id: 3, name: "St. Marys", initials: "SM" },
    { id: 4, name: "Bright Future", initials: "BF" },
    { id: 5, name: "Newton High", initials: "NH" },
    { id: 6, name: "Pioneer STEM", initials: "PS" },
  ];

  return (
    <div className="section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
        <h5 style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Trusted By Schools
        </h5>
        <h2 style={{ marginBottom: '3rem', fontSize: '2rem' }}>Our Partners</h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
          gap: '2.5rem',
          alignItems: 'center',
          justifyItems: 'center'
        }}>
          {clients.map((client) => (
            <div key={client.id} className="client-logo" title={client.name}>
              <div style={{ fontWeight: '800', fontSize: '2rem', letterSpacing: '1px' }}>{client.initials}</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.4rem', fontWeight: '500' }}>{client.name}</div>
            </div>
          ))}
        </div>
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
