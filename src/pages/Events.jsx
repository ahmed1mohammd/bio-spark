import React from 'react';
import { Link } from 'react-router-dom';

export default function Events() {
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
          We are preparing exciting new live events, science shows, and workshops. Stand by! We'll be launching this page very soon.
        </p>

        <Link to="/" className="btn-primary" style={{ 
          marginTop: '2.5rem', 
          padding: '1rem 3rem', 
          fontSize: '1.1rem',
          zIndex: 1,
          boxShadow: '0 10px 25px rgba(0, 139, 240, 0.3)'
        }}>
          Return Home
        </Link>

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
