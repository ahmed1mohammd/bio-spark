import React, { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaClock, FaUsers, FaGraduationCap, FaFlask, FaSearch } from 'react-icons/fa';
import { fetchData, API_ENDPOINTS } from '../utils/api';
import DnaLoader from '../components/DnaLoader';

// --- 3D Interactive Card strictly following BioSpark Design System ---
const WorkshopCard3D = ({ ws }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
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

    // Smooth 3D tilt calculation (-10deg to +10deg)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setStyle({
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
    setStyle({
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
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="glass-panel interactive card-3d-inner"
        style={{
          transform: `rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg) scale3d(${style.scale}, ${style.scale}, ${style.scale})`,
          transition: style.isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: style.isHovered
            ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 139, 240, 0.35)'
            : 'var(--glass-shadow)',
          borderColor: style.isHovered ? 'rgba(255, 255, 255, 0.4)' : 'var(--glass-border)'
        }}
      >
        {/* Holographic Glare Overlay */}
        <div
          className="glare-overlay"
          style={{
            background: `radial-gradient(circle at ${style.glareX}% ${style.glareY}%, rgba(255, 255, 255, ${style.glareOpacity}) 0%, rgba(255, 255, 255, 0) 70%)`,
          }}
        />

        {/* 3D Layer 1: Image Wrapper & Category Badge */}
        <div className="workshop-img-container">
          <img
            src={ws.imageUrl || '/spark_character.png'}
            alt={ws.title}
            className="workshop-img"
            onError={(e) => { e.target.src = '/main.png'; }}
          />
          {ws.category && (
            <span className="workshop-category-badge">
              <FaFlask size={12} style={{ marginRight: '6px' }} />
              {ws.category}
            </span>
          )}
        </div>

        {/* 3D Layer 2: Content Details */}
        <div className="workshop-content">
          <h3 className="workshop-title">{ws.title}</h3>
          
          <p className="workshop-desc">
            {ws.shortDescription || ws.description || ws.fullDescription}
          </p>

          {/* Metadata Pills */}
          <div className="workshop-meta-pills">
            {ws.duration && (
              <span className="meta-pill">
                <FaClock className="meta-icon" /> {ws.duration}
              </span>
            )}
            {ws.capacity && (
              <span className="meta-pill">
                <FaUsers className="meta-icon" /> {ws.capacity}
              </span>
            )}
            <span className="meta-pill">
              <FaGraduationCap className="meta-icon" /> {ws.ageGroup || 'Grades 6 - 12'}
            </span>
          </div>

          <div className="workshop-footer">
            {ws.price !== undefined && ws.price !== null && (
              <div className="workshop-price">
                {ws.price > 0 ? `$${ws.price}` : 'Inquire for Pricing'}
              </div>
            )}
            <a
              href={ws.registrationLink || `https://wa.me/201140866774?text=${encodeURIComponent(`Hi BioSpark, I'm interested in booking the ${ws.title} workshop.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary product-btn-green workshop-btn-cta"
            >
              <FaWhatsapp size={18} style={{ marginRight: '8px' }} /> Book Workshop
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const DEFAULT_WORKSHOPS = [
  {
    _id: '1',
    title: 'DNA Extraction & Electrophoresis Lab',
    category: 'Genetics',
    shortDescription: 'Isolate real DNA from strawberries and bacterial cells, run agarose gel electrophoresis, and analyze bands.',
    description: 'Students learn micropipetting, gel preparation, DNA isolation, and UV transillumination visualization.',
    imageUrl: '/main.png',
    duration: '2 Hours',
    targetGrade: 'Grades 7-12',
    capacity: '30 Students',
    keyTakeaways: ['Strawberry DNA Isolation', 'Gel Running', 'UV Transillumination', 'Lab Certificate']
  },
  {
    _id: '2',
    title: 'Microbiology & Bacterial Transformation',
    category: 'Microbiology',
    shortDescription: 'Transform E. coli bacteria to express Green Fluorescent Protein (GFP) under UV light.',
    description: 'A hands-on workshop demonstrating plasmid insertion, heat shock technique, and antibiotic selection.',
    imageUrl: '/herosec.png',
    duration: '3 Hours',
    targetGrade: 'Grades 9-12',
    capacity: '25 Students',
    keyTakeaways: ['Plasmid Insertion', 'Heat Shock Protocol', 'GFP Glow Visualization', 'Aseptic Technique']
  },
  {
    _id: '3',
    title: 'Cellular Structure & 3D Bio-Modeling',
    category: 'Cell Biology',
    shortDescription: 'Build 3D interactive cell structures, explore organelle functions, and examine live microscopic specimens.',
    description: 'Middle and high school students build cell models and observe living paramecia and euglena.',
    imageUrl: '/spark_character.png',
    duration: '1.5 Hours',
    targetGrade: 'Grades 5-9',
    capacity: '35 Students',
    keyTakeaways: ['Microscope Inspection', '3D Cell Models', 'Organelle Functions', 'Interactive Quiz']
  }
];

// --- Main Workshops Page following BioSpark Theme ---
export default function Workshops() {
  const [workshops, setWorkshops] = useState(DEFAULT_WORKSHOPS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const result = await fetchData(API_ENDPOINTS.WORKSHOPS);
        if (result?.data && result.data.length > 0) {
          setWorkshops(result.data);
        }
      } catch (err) {
        console.error('Workshops fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    getWorkshops();
  }, []);

  const categories = ['All', ...new Set(workshops.map(w => w.category).filter(Boolean))];

  const filteredWorkshops = workshops.filter(ws => {
    const matchesSearch = ws.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ws.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || ws.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="workshops-page">
      {/* Hero Header */}
      <section className="workshops-hero">
        <div className="workshops-hero-content">
          <span className="workshops-tag">HANDS-ON BIOTECHNOLOGY</span>
          <h1 className="workshops-title">Educational Workshops</h1>
          <p className="workshops-subtitle">
            Immersive biotechnology and genetics workshops designed for schools, STEM clubs, and young scientists.
          </p>

          {/* Search Bar */}
          <div className="search-bar-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search workshops by topic or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      {categories.length > 1 && (
        <section className="section category-section">
          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 3D Grid Section */}
      <section className="section workshops-grid-section">
        {loading ? (
          <DnaLoader text="Loading Educational Workshops..." />
        ) : error ? (
          <div className="error-state" style={{ textAlign: 'center', padding: '4rem', color: '#ff4d4f' }}>{error}</div>
        ) : filteredWorkshops.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '4rem' }}>No workshops found matching your criteria.</div>
        ) : (
          <div className="workshops-3d-grid">
            {filteredWorkshops.map(ws => (
              <WorkshopCard3D key={ws._id || ws.id} ws={ws} />
            ))}
          </div>
        )}
      </section>

      <style>{`
        .workshops-page {
          padding-top: 5rem;
          padding-bottom: 5rem;
          min-height: 100vh;
          background: linear-gradient(135deg, #012b7d 0%, #004391 100%);
        }

        .workshops-hero {
          padding: 4rem 1.5rem 2rem;
          text-align: center;
          position: relative;
        }

        .workshops-tag {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 2px;
          color: var(--accent-green);
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 0.8rem;
        }

        .workshops-title {
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .workshops-subtitle {
          max-width: 680px;
          margin: 0 auto 2.5rem;
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .search-bar-wrapper {
          position: relative;
          max-width: 550px;
          margin: 0 auto;
        }

        .search-icon {
          position: absolute;
          left: 1.2rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .search-input {
          width: 100%;
          padding: 0.95rem 1rem 0.95rem 3.2rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .search-input:focus {
          border-color: var(--accent-green);
          box-shadow: 0 0 20px rgba(101, 169, 46, 0.3);
          background: rgba(255, 255, 255, 0.12);
        }

        .category-section {
          padding-top: 1rem;
          padding-bottom: 2rem;
        }

        .category-tabs {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .category-tab-btn {
          padding: 0.6rem 1.4rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-tab-btn:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .category-tab-btn.active {
          background: var(--accent-green);
          color: #000000;
          border-color: var(--accent-green);
          box-shadow: 0 4px 15px rgba(101, 169, 46, 0.4);
        }

        .workshops-3d-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        @media (max-width: 768px) {
          .workshops-3d-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .card-3d-wrapper {
          height: 100%;
        }

        .card-3d-inner {
          position: relative;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          background: rgba(0, 20, 50, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          flex-direction: column;
          transition: all 0.4s ease;
        }

        .card-3d-inner:hover {
          border-color: rgba(101, 169, 46, 0.4);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45), 0 0 25px rgba(101, 169, 46, 0.25);
        }

        .glare-overlay {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          pointer-events: none;
          z-index: 10;
        }

        .workshop-img-container {
          position: relative;
          height: 220px;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(0, 20, 50, 0.6) 0%, rgba(5, 40, 80, 0.4) 100%);
        }

        .workshop-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .card-3d-inner:hover .workshop-img {
          transform: scale(1.08);
        }

        .workshop-category-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          display: inline-flex;
          align-items: center;
          padding: 6px 14px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--accent-green), #84c233);
          color: #000000;
          font-size: 0.78rem;
          font-weight: 800;
          box-shadow: 0 4px 15px rgba(101, 169, 46, 0.4);
        }

        .workshop-content {
          padding: 1.8rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .workshop-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.8rem;
          line-height: 1.3;
        }

        .workshop-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 1.4rem;
          flex: 1;
        }

        .workshop-meta-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 1.6rem;
        }

        .meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 600;
        }

        .meta-icon {
          color: var(--accent-green);
        }

        .workshop-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .workshop-price {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--accent-green);
        }

        .workshop-btn-cta {
          width: 100%;
          padding: 0.85rem 1.4rem;
          font-size: 0.98rem;
          font-weight: 700;
          border-radius: 999px;
          justify-content: center;
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
