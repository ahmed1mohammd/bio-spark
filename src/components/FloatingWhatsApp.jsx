import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a 
      href="https://wa.me/201140866774" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '2.5rem',
        right: '2.5rem',
        zIndex: 999,
        background: '#25D366',
        color: 'white',
        width: '65px',
        height: '65px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '34px',
        boxShadow: isHovered 
          ? '0 10px 30px rgba(37, 211, 102, 0.6), 0 0 20px rgba(37, 211, 102, 0.4)' 
          : '0 5px 20px rgba(37, 211, 102, 0.4), 0 0 10px rgba(37, 211, 102, 0.2)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: isHovered ? 'scale(1.15) translateY(-8px)' : 'scale(1)',
        backdropFilter: 'blur(10px)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FaWhatsapp />
    </a>
  );
}
