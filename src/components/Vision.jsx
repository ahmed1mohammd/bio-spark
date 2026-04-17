import React from 'react';
import { FaGlobe } from 'react-icons/fa';

export default function Vision() {
  return (
    <div className="section">
      <h2>Our Vision</h2>
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <FaGlobe size={60} color="#60a5fa" />
        </div>
        <p style={{ fontSize: '1.2rem', margin: 0 }}>
          A world where every child has the opportunity to discover their passion for STEM. We envision Bio Spark becoming an integral part of science curricula worldwide, fostering a global community of scientifically literate and environmentally conscious citizens.
        </p>
      </div>
    </div>
  );
}
