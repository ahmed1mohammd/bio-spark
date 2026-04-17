import React from 'react';
import { FaRocket } from 'react-icons/fa';

export default function Mission() {
  return (
    <div className="section">
      <div className="glass-panel" style={{ 
        padding: '4rem', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '3rem',
        flexWrap: 'wrap',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(30, 58, 138, 0.3))',
        border: '1px solid var(--accent-cyan)'
      }}>
        <div style={{ flex: '1 1 300px' }}>
          <FaRocket size={80} color="var(--accent-cyan)" />
          <h2 style={{ textAlign: 'left', marginTop: '1.5rem', marginBottom: '1rem' }}>Our Mission</h2>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>
            To make high-quality, practical science education accessible to every student. We aim to transform traditional classrooms into dynamic laboratories where students can touch, see, and experience scientific principles in action.
          </p>
        </div>
      </div>
    </div>
  );
}
