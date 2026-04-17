import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { ArrowRight, Sparkles, Dna, FlaskConical, Microscope, Atom } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API fetch
  useEffect(() => {
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          title: "3D Human Heart Model",
          badge: "3D Product",
          icon: <Atom size={24} />,
          description: "A highly detailed and interactive 3D model of the human heart, perfect for exploring cardiovascular anatomy and function.",
          image: "https://i.ibb.co/tpt9hvQf/Whats-App-Image-2026-04-16-at-11-48-52-PM.jpg"
        },
        {
          id: 2,
          title: "Creative Bio Pins",
          badge: "Edutainment",
          icon: <Sparkles size={24} />,
          description: "High-quality, uniquely designed pins that celebrate the wonders of biology, perfect for customizing your backpacks and lab coats.",
          image: "https://i.ibb.co/7NYLMvJT/Whats-App-Image-2026-04-17-at-11-20-02-PM.jpg"
        },
        {
          id: 3,
          title: "Human Body Anatomy",
          badge: "Puzzles",
          icon: <Dna size={24} />,
          description: "Challenging puzzle to learn and explore human body anatomy interactively.",
          image: "https://i.ibb.co/w1wfwT0/Whats-App-Image-2026-04-17-at-3-52-51-PM.jpg"
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="section programs-section">
      
      {/* Subtle Background Elements */}
      <div className="programs-bg-elements">
        <Dna className="bg-icon-prog dna-1" size={250} strokeWidth={0.5} />
        <Dna className="bg-icon-prog dna-2" size={300} strokeWidth={0.5} />
      </div>

      <div className="products-header">
        <div className="header-content">
          <div className="section-label">
            <Sparkles size={16} color="var(--accent-green)" /> Premium Offerings
          </div>
          <h2 className="title">Explore Our Programs</h2>
          <p className="subtitle">
            Designed to bring science to life through immersive, real-world experiences inside your school.
          </p>
        </div>
        
        <a href="/products" className="view-all-link">
          See All Programs <ArrowRight size={20} />
        </a>
      </div>
      
      {loading ? (
        <div className="loading-state">
          <div className="loader"></div>
          <p>Curating programs...</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card glass-panel interactive">
              <div className="product-image-container">
                <div className="product-image-glow"></div>
                <img src={product.image} alt={product.title} className="product-item-img float-slow" />
                <div className="product-badge">{product.badge}</div>
                <div className="product-icon">{product.icon}</div>
              </div>
              
              <div className="product-content">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-desc">{product.description}</p>
                
                <div className="product-footer">
                  <a href={`https://wa.me/201140866774?text=I'm interested in ${product.title}`} className="btn-primary product-btn-green" target="_blank" rel="noopener noreferrer" style={{ width: '100%', justifyContent: 'center' }}>
                    <FaWhatsapp size={18} /> Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .programs-section {
          padding-top: 5rem;
          padding-bottom: 8rem;
          position: relative;
          overflow: hidden;
        }

        .programs-bg-elements {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-icon-prog {
          position: absolute;
          color: rgba(255, 255, 255, 0.02);
        }
        .dna-1 { left: -5%; top: 20%; transform: rotate(-15deg); }
        .dna-2 { right: -5%; bottom: 10%; transform: rotate(25deg); }

        .float-spark-icon {
          position: absolute;
          width: 60px;
          opacity: 0.3;
          filter: blur(2px) drop-shadow(0 0 10px rgba(0, 139, 240, 0.5));
          animation: floatSparkIcon 8s ease-in-out infinite alternate;
        }
        .fs-1 { top: 10%; right: 15%; animation-delay: 0s; transform: scaleX(-1); }
        .fs-2 { bottom: 20%; left: 8%; animation-delay: -3s; }

        @keyframes floatSparkIcon {
          0% { transform: translateY(0); }
          100% { transform: translateY(-30px); }
        }

        .products-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4.5rem;
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        .header-content {
          max-width: 650px;
        }

        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1.2rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 99px;
          color: white;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .products-header .title {
          text-align: left;
          font-size: clamp(2.8rem, 4vw, 3.5rem);
          margin-bottom: 1rem;
          color: white;
          line-height: 1.1;
          font-weight: 800;
        }

        .products-header .subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.6;
        }

        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-green);
          text-decoration: none;
          font-size: 1.15rem;
          font-weight: 600;
          padding-bottom: 0.5rem;
          position: relative;
          transition: color 0.3s ease;
          white-space: nowrap;
        }

        .view-all-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          width: 0; height: 2px;
          background: var(--accent-green);
          transition: width 0.3s ease;
        }

        .view-all-link:hover {
          color: white;
        }
        .view-all-link:hover::after {
          width: 100%;
          background: white;
        }
        .view-all-link svg {
          transition: transform 0.3s ease;
        }
        .view-all-link:hover svg {
          transform: translateX(5px);
        }

        /* Enforce 3 cards in a row natively on desktop */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          position: relative;
          z-index: 2;
        }

        .product-card {
          display: flex;
          flex-direction: column;
          border-radius: 24px;
          overflow: hidden;
          background: rgba(0, 20, 50, 0.35);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover {
          transform: translateY(-10px);
          background: rgba(0, 30, 70, 0.5);
          border-color: rgba(101, 169, 46, 0.4);
          box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 35px rgba(101, 169, 46, 0.2);
        }

        .product-image-container {
          position: relative;
          height: 260px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, rgba(0, 139, 240, 0.1), rgba(101, 169, 46, 0.05));
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          overflow: visible; /* Let the icon overflow slightly */
          padding: 1.5rem;
        }

        .product-image-glow {
          position: absolute;
          width: 150px;
          height: 150px;
          background: var(--light-blue);
          filter: blur(60px);
          opacity: 0.2;
          z-index: 0;
          transition: opacity 0.4s ease;
        }

        .product-card:hover .product-image-glow {
          opacity: 0.4;
          background: var(--accent-green);
        }

        .product-item-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
          z-index: 2;
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy effect */
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }

        .product-card:hover .product-item-img {
          transform: scale(1.15) translateY(-15px);
        }

        .float-slow {
          animation: floatProducts 4s ease-in-out infinite alternate;
        }

        @keyframes floatProducts {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }

        .product-icon {
          position: absolute;
          bottom: -25px;
          right: 30px;
          width: 60px;
          height: 60px;
          background: rgba(0, 20, 50, 0.95);
          border: 2px solid rgba(101, 169, 46, 0.4);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3), inset 0 0 10px rgba(101, 169, 46, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-green);
          z-index: 3;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover .product-icon {
          background: var(--accent-green);
          color: white;
          transform: translateY(-5px) rotate(10deg);
          box-shadow: 0 15px 30px rgba(101, 169, 46, 0.5);
        }

        .product-badge {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 2;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: white;
          padding: 0.4rem 0.9rem;
          border-radius: 99px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .product-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 2.5rem 2rem 2.5rem 2rem;
          margin-top: 0;
        }

        .product-title {
          font-size: 1.6rem;
          color: white;
          font-weight: 700;
          margin-bottom: 0.8rem;
          text-shadow: 0 2px 5px rgba(0,0,0,0.5);
        }

        .product-desc {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 1.05rem;
          margin-bottom: 2rem;
          flex: 1;
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1.5rem;
          margin-top: auto;
        }

        /* Specific Green CTA Request - Shifts on Card Hover */
        .product-btn-green {
          padding: 0.8rem 1.6rem;
          font-size: 1rem;
          gap: 0.5rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: inline-flex;
          align-items: center;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .product-card:hover .product-btn-green {
          background: linear-gradient(90deg, #448e2b, #65a92e);
          box-shadow: 0 8px 25px rgba(101, 169, 46, 0.5);
          border-color: transparent;
          transform: translateY(-2px);
          color: white;
        }
        
        .product-btn-green:hover {
          background: linear-gradient(90deg, #65a92e, #84c233) !important;
          box-shadow: 0 8px 30px rgba(101, 169, 46, 0.7) !important;
          transform: translateY(-4px) !important;
        }

        .product-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .product-link:hover {
          color: white;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 0;
        }

        .loader {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255,255,255,0.1);
          border-top-color: var(--accent-green);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1.5rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Breakpoints to strictly enforce requested row counting */
        @media (max-width: 1024px) {
          .products-grid {
             grid-template-columns: repeat(2, 1fr);
          }
          .products-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        
        @media (max-width: 768px) {
          .products-grid {
             grid-template-columns: 1fr;
          }
          .product-card {
             border-radius: 16px;
          }
          .product-image-wrapper {
             height: 220px;
          }
          .product-content {
             padding: 0 1.5rem 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
