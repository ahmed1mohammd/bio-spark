import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchData, API_ENDPOINTS } from '../utils/api';
import Card3D from '../components/Card3D';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const result = await fetchData(API_ENDPOINTS.EVENTS);
        setEvents(result?.data || []);
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  if (!loading && events.length > 0) {
    return (
      <div className="section" style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: '80vh' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Events</h2>
        <p style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Join our upcoming live events and science showcases.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {events.map(event => (
            <Card3D key={event._id} style={{ overflow: 'hidden', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', height: '240px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    transition: 'transform 0.5s ease'
                  }} 
                />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>{event.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{event.description}</p>
                {event.registrationLink && (
                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Register Now
                  </a>
                )}
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ 
      paddingTop: '6rem', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center'
    }}>
      {/* ... keeping the coming soon UI if no events ... */}
      <div className="glass-panel" style={{ 
        maxWidth: '800px', 
        width: '90%',
        padding: '4rem 2rem', 
        background: 'rgba(0, 20, 50, 0.4)', 
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '32px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Subtle Glow Background */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(circle, rgba(101, 169, 46, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0
        }}></div>

        <img 
          src="/herosec.png" 
          alt="Bio Spark Events - Coming Soon" 
          style={{ 
            width: '100%', 
            maxWidth: '380px', 
            marginBottom: '2rem', 
            zIndex: 1,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
            animation: 'floating 6s ease-in-out infinite'
          }} 
        />
        
        <h2 style={{ 
          fontSize: '3.5rem', 
          marginBottom: '1rem', 
          color: 'white', 
          zIndex: 1,
          letterSpacing: '1px'
        }}>
          Coming <span style={{ color: 'var(--accent-green)' }}>Soon</span>
        </h2>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-secondary)', 
          lineHeight: '1.7', 
          maxWidth: '550px', 
          margin: '0 auto',
          zIndex: 1
        }}>
          {loading ? 'Checking for updates...' : "We are preparing exciting new live events, science shows, and workshops. Stand by! We'll be launching this page very soon."}
        </p>

        {!loading && (
          <Link to="/" className="btn-primary" style={{ 
            marginTop: '2.5rem', 
            padding: '1rem 3rem', 
            fontSize: '1.1rem',
            zIndex: 1,
            boxShadow: '0 10px 25px rgba(0, 139, 240, 0.3)'
          }}>
            Return Home
          </Link>
        )}

      </div>

      <style>{`
        @keyframes floating {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
}
