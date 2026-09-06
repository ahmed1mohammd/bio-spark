import React from 'react';
import './DnaLoader.css';

export default function DnaLoader({ text = 'Loading...' }) {
  const dotsCount = 14;
  
  return (
    <div className="dna-loader-container">
      <div className="dna-helix-spinner">
        {[...Array(dotsCount)].map((_, i) => (
          <div 
            key={i} 
            className="dna-bar" 
            style={{ 
              animationDelay: `${i * -0.16}s`
            }}
          >
            <span className="dna-node node-top"></span>
            <span className="dna-line"></span>
            <span className="dna-node node-bottom"></span>
          </div>
        ))}
      </div>
      {text && <p className="dna-loader-text">{text}</p>}
    </div>
  );
}
