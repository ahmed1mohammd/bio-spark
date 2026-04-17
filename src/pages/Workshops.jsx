import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWorkshops([
        { 
          id: 1, 
          title: "DNA Extraction Kit", 
          description: "This hands-on workshop introduces students to the basics of DNA extraction, allowing them to isolate DNA using simple techniques. Students will explore the importance of DNA and connect theory with real-life applications in genetics and biotechnology.", 
          image: "https://i.ibb.co/xKVkGspT/Whats-App-Image-2026-04-16-at-9-55-07-PM.jpg" 
        },
        { 
          id: 2, 
          title: "Microbe Detective kit", 
          description: "This hands-on workshop introduces students to essential microbiology techniques, including microbial isolation, streaking methods, and basic staining. Participants will gain practical lab experience while exploring how microorganisms are studied and identified.", 
          image: "https://i.ibb.co/NnSbW7Gd/Whats-App-Image-2026-04-16-at-9-55-07-PM-1.jpg" 
        },
        { 
          id: 3, 
          title: "ELISA Kit", 
          description: "This hands-on workshop introduces students to the basics of ELISA technique, allowing them to detect and measure specific proteins or antibodies. Participants will gain practical experience and understand its applications in diagnostics and research.", 
          image: "https://i.ibb.co/21RqV3SP/Whats-App-Image-2026-04-16-at-9-55-08-PM.jpg" 
        }
      ]);
      setLoading(false);
    }, 800);
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
              <div key={ws.id} className="glass-panel interactive" style={{ 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
              }}>
                <div style={{ height: '220px', width: '100%', overflow: 'hidden' }}>
                  <img 
                    src={ws.image} 
                    alt={ws.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
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
