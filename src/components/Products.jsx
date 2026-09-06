import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { Sparkles, Dna, FlaskConical, Microscope, Atom, CheckCircle2, ChevronRight } from 'lucide-react';
import { fetchData, API_ENDPOINTS } from '../utils/api';
import Card3D from './Card3D';
import DnaLoader from './DnaLoader';

const DEFAULT_PRODUCTS = [
  {
    _id: '1',
    title: 'School Biotech Workshop',
    category: 'Workshop',
    description: 'Hands-on DNA extraction, gel electrophoresis, and molecular biology experiments designed for middle & high schools.',
    imageUrl: '/main.png',
    icon: <Dna size={22} color="#73C52A" />,
    features: ['Live Experiments', 'Safety Gear', 'Certification']
  },
  {
    _id: '2',
    title: 'Mobile BioLab Session',
    category: 'Mobile Lab',
    description: 'A state-of-the-art portable laboratory brought directly to your campus equipped with real biotech instruments.',
    imageUrl: '/herosec.png',
    icon: <FlaskConical size={22} color="#4CD6FF" />,
    features: ['PCR & Centrifuge', 'Expert Mentors', 'Mobile Setup']
  },
  {
    _id: '3',
    title: 'STEM Discovery Experience',
    category: 'Interactive Kit',
    description: 'Engaging biological models, 3D molecular structures, and interactive science modules for immersive learning.',
    imageUrl: '/spark_character.png',
    icon: <Microscope size={22} color="#FFD700" />,
    features: ['3D Models', 'Interactive Theory', 'Hands-on Kit']
  }
];

export default function Products() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await fetchData(API_ENDPOINTS.PRODUCTS);
        const data = result?.data || [];
        if (data.length > 0) {
          const icons = [<Dna size={22} color="#73C52A" />, <FlaskConical size={22} color="#4CD6FF" />, <Microscope size={22} color="#FFD700" />];
          const updatedData = data.slice(0, 3).map((p, index) => ({
            ...p,
            icon: icons[index % icons.length],
            features: p.features || ['Live Experiments', 'Curriculum Aligned', 'Hands-on']
          }));
          setProducts(updatedData);
        }
      } catch (err) {
        console.error('Failed to load home products:', err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <section className="section programs-section" id="products">
      {/* Background Motifs */}
      <div className="programs-bg-elements">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <Dna className="bg-icon-prog dna-1" size={260} strokeWidth={0.5} />
        <FlaskConical className="bg-icon-prog flask-1" size={220} strokeWidth={0.5} />
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="products-header">
          <div className="header-content">
            <div className="section-label">
              <Sparkles size={15} color="var(--accent-green)" />
              <span>PREMIUM EDUCATIONAL OFFERINGS</span>
            </div>
            <h2 className="title">
              Explore Our <span className="gradient-text">Programs</span>
            </h2>
            <p className="subtitle">
              Transforming science education with cutting-edge mobile labs, interactive workshops, and practical STEM experiences inside your school.
            </p>
          </div>
          
          <Link to="/workshops" className="view-all-btn">
            <span>See All Programs</span>
            <ChevronRight size={18} />
          </Link>
        </div>

        {/* Products Grid */}
        {loading ? (
          <DnaLoader text="Curating Educational Programs..." />
        ) : (
          <div className="products-grid">
          {products.map((product) => (
            <Card3D key={product._id} className="product-card">
              {/* Media Header */}
              <div className="product-image-container">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="product-item-img"
                  onError={(e) => { e.target.src = '/main.png'; }}
                />
                <div className="product-image-overlay"></div>
                <span className="product-badge">{product.category || 'Program'}</span>
                <div className="product-icon-badge">
                  {product.icon}
                </div>
              </div>
              
              {/* Card Body */}
              <div className="product-content">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-desc">{product.description}</p>
                
                {/* Feature Tags */}
                {product.features && (
                  <div className="product-features">
                    {product.features.map((feat, idx) => (
                      <span key={idx} className="feature-pill">
                        <CheckCircle2 size={13} color="var(--accent-green)" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="product-footer">
                  <a 
                    href={`https://wa.me/201140866774?text=I'm interested in booking the program: ${encodeURIComponent(product.title)}`} 
                    className="product-btn-green" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp size={18} />
                    <span>Book Program</span>
                  </a>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
        )}
      </div>

      <style>{`
        .programs-section {
          padding-top: 6rem;
          padding-bottom: 7rem;
          position: relative;
          overflow: hidden;
        }

        .programs-bg-elements {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.18;
        }
        .orb-1 { width: 500px; height: 500px; background: #008bf0; top: -10%; left: -10%; }
        .orb-2 { width: 450px; height: 450px; background: #73C52A; bottom: -10%; right: -10%; }

        .bg-icon-prog {
          position: absolute;
          color: rgba(255, 255, 255, 0.02);
        }
        .dna-1 { left: -3%; top: 15%; transform: rotate(-15deg); }
        .flask-1 { right: -2%; bottom: 15%; transform: rotate(20deg); }

        .products-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
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
          gap: 0.6rem;
          padding: 0.45rem 1.2rem;
          background: rgba(115, 197, 42, 0.12);
          border: 1px solid rgba(115, 197, 42, 0.3);
          border-radius: 99px;
          color: var(--accent-green);
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 1.2rem;
        }

        .products-header .title {
          text-align: left;
          font-size: clamp(2.4rem, 4vw, 3.4rem);
          margin-bottom: 1rem;
          color: white;
          line-height: 1.15;
          font-weight: 800;
        }

        .gradient-text {
          background: linear-gradient(135deg, #73C52A 0%, #4CD6FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .products-header .subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.65;
        }

        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.6rem;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }

        .view-all-btn:hover {
          background: var(--accent-green);
          color: #000000;
          border-color: var(--accent-green);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(115, 197, 42, 0.4);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.2rem;
          position: relative;
          z-index: 2;
        }

        .product-card {
          display: flex;
          flex-direction: column;
          border-radius: 28px;
          overflow: hidden;
          background: rgba(0, 22, 50, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
        }

        .product-card:hover {
          transform: translateY(-10px);
          border-color: rgba(115, 197, 42, 0.4);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), 0 0 35px rgba(115, 197, 42, 0.25);
        }

        .product-image-container {
          position: relative;
          height: 230px;
          overflow: hidden;
          background: #001229;
        }

        .product-item-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .product-card:hover .product-item-img {
          transform: scale(1.08);
        }

        .product-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 22, 50, 0.95) 0%, transparent 60%);
          pointer-events: none;
        }

        .product-badge {
          position: absolute;
          top: 1.2rem;
          left: 1.2rem;
          z-index: 3;
          background: rgba(4, 28, 62, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 0.35rem 0.9rem;
          border-radius: 99px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .product-icon-badge {
          position: absolute;
          top: 1.2rem;
          right: 1.2rem;
          z-index: 3;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: rgba(4, 28, 62, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-icon-badge {
          transform: scale(1.1) rotate(6deg);
        }

        .product-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 1.8rem 1.8rem 2rem 1.8rem;
        }

        .product-title {
          font-size: 1.45rem;
          color: #ffffff;
          font-weight: 700;
          margin-bottom: 0.8rem;
          line-height: 1.3;
        }

        .product-desc {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 0.96rem;
          margin-bottom: 1.4rem;
          flex: 1;
        }

        .product-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.8rem;
        }

        .feature-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.75rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #CBD5E1;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .product-footer {
          margin-top: auto;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .product-btn-green {
          width: 100%;
          justify-content: center;
          padding: 0.85rem 1.5rem;
          font-size: 0.95rem;
          font-weight: 700;
          gap: 0.6rem;
          border-radius: 14px;
          background: linear-gradient(135deg, #65a92e 0%, #448e2b 100%);
          color: #ffffff;
          border: 1px solid rgba(115, 197, 42, 0.4);
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(101, 169, 46, 0.3);
        }

        .product-btn-green:hover {
          background: linear-gradient(135deg, #73C52A 0%, #65a92e 100%);
          box-shadow: 0 10px 28px rgba(115, 197, 42, 0.5);
          transform: translateY(-2px);
          color: #ffffff;
        }

        @media (max-width: 1024px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          .products-header { flex-direction: column; align-items: flex-start; }
        }

        @media (max-width: 640px) {
          .products-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
