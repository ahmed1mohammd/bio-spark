import React, { useRef, useState } from 'react';

export default function Card3D({ children, className = '', style = {}, ...props }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    isHovered: false
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle({
      rotateX,
      rotateY,
      scale: 1.03,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      glareOpacity: 0.25,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
      isHovered: false
    });
  };

  return (
    <div
      className="card-3d-wrapper"
      style={{ perspective: '1000px', height: '100%', width: '100%' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className={`glass-panel interactive card-3d-inner ${className}`}
        style={{
          transform: `rotateX(${transformStyle.rotateX}deg) rotateY(${transformStyle.rotateY}deg) scale3d(${transformStyle.scale}, ${transformStyle.scale}, ${transformStyle.scale})`,
          transition: transformStyle.isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: transformStyle.isHovered
            ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 139, 240, 0.35)'
            : 'var(--glass-shadow)',
          borderColor: transformStyle.isHovered ? 'rgba(255, 255, 255, 0.4)' : 'var(--glass-border)',
          transformStyle: 'preserve-3d',
          position: 'relative',
          ...style
        }}
        {...props}
      >
        <div
          className="glare-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 10,
            background: `radial-gradient(circle at ${transformStyle.glareX}% ${transformStyle.glareY}%, rgba(255, 255, 255, ${transformStyle.glareOpacity}) 0%, rgba(255, 255, 255, 0) 70%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}
