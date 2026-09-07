import React, { useState, useEffect, useCallback } from 'react';
import { Dna, ChevronLeft, ChevronRight, X, Sparkles, Eye, FlaskConical } from 'lucide-react';
import { fetchGallery, fetchCustomers } from '../services/api';

const defaultGalleryItems = [
  {
    _id: '1',
    title: 'High School DNA Gel Electrophoresis',
    description: 'Students loading fluorescent DNA samples into agarose gel wells using precision micropipettes.',
    imageUrl: '/main.png',
    category: 'Workshops',
    size: 'large'
  },
  {
    _id: '2',
    title: 'Mobile Bio Lab Setup',
    description: 'BioSpark portable biotechnology suite set up inside a school laboratory classroom.',
    imageUrl: '/spark_character.png',
    category: 'Experiments',
    size: 'portrait'
  },
  {
    _id: '3',
    title: 'Science Day 3D Molecular Station',
    description: 'Interactive 3D protein structure visualization booth at the annual STEM exhibition.',
    imageUrl: '/herosec.png',
    category: 'Events',
    size: 'wide'
  },
  {
    _id: '4',
    title: 'Bacterial Transformation Achievement',
    description: 'Junior scientists observing glowing GFP bacterial colonies under UV transilluminators.',
    imageUrl: '/About.png',
    category: 'Students',
    size: 'medium'
  }
];

const categories = ['ALL', 'WORKSHOPS', 'EXPERIMENTS', 'EVENTS', 'STUDENTS', 'OUR CUSTOMERS', 'BEHIND THE SCENES'];

export default function GallerySection() {
  const [items, setItems] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const [galleryRes, customersRes] = await Promise.allSettled([
          fetchGallery({ active: true }),
          fetchCustomers()
        ]);

        let combinedItems = [];
        let fetchedCustomers = [];

        if (galleryRes.status === 'fulfilled' && galleryRes.value?.data?.data?.length > 0) {
          const mappedGallery = galleryRes.value.data.data.map((item, idx) => ({
            _id: item._id || item.id,
            title: item.title || 'BioSpark Moment',
            description: item.description || '',
            imageUrl: item.imageUrl || item.image || '/main.png',
            category: item.category || 'Workshops',
            size: item.size || (idx % 5 === 0 ? 'large' : idx % 3 === 0 ? 'portrait' : idx % 4 === 0 ? 'wide' : 'medium')
          }));
          combinedItems.push(...mappedGallery);
        }

        if (customersRes.status === 'fulfilled' && customersRes.value?.data?.data?.length > 0) {
          fetchedCustomers = customersRes.value.data.data;
          const mappedCustomers = customersRes.value.data.data.map((c, idx) => ({
            _id: c._id || `cust-${idx}`,
            title: c.title || c.name || 'Our Valued Partner School',
            description: c.description || 'BioSpark Educational Partner',
            imageUrl: c.imageUrl || c.image || '/main.png',
            category: 'OUR CUSTOMERS',
            size: idx % 3 === 0 ? 'wide' : 'medium'
          }));
          combinedItems.push(...mappedCustomers);
        }

        setCustomersList(fetchedCustomers);

        if (combinedItems.length > 0) {
          setItems(combinedItems);
        } else {
          setItems(defaultGalleryItems);
        }
      } catch (err) {
        console.warn('Using fallback gallery items:', err);
        setItems(defaultGalleryItems);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  // Filter items
  const filteredItems = items.filter(item => {
    if (activeCategory === 'ALL') return true;
    return item.category.toUpperCase().replace(/\s+/g, '') === activeCategory.replace(/\s+/g, '');
  });

  // Distribute items into 3 columns matching user requested photo gallery layout
  const col1 = [];
  const col2 = [];
  const col3 = [];

  filteredItems.forEach((item, idx) => {
    const colIndex = idx % 3;
    const rowInCol = Math.floor(idx / 3);
    
    if (colIndex === 0) {
      col1.push({ item, idx, isTall: rowInCol % 2 === 0 });
    } else if (colIndex === 1) {
      col2.push({ item, idx, isTall: rowInCol % 2 !== 0 });
    } else {
      col3.push({ item, idx, isTall: rowInCol % 2 === 0 });
    }
  });

  // Lightbox handlers
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevLightboxItem = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const nextLightboxItem = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightboxItem();
      if (e.key === 'ArrowRight') nextLightboxItem();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, prevLightboxItem, nextLightboxItem]);

  return (
    <section className="gallery-section" id="gallery">
      {/* Background Decorative Science Line-art */}
      <div className="gallery-bg-decorations">
        <Dna className="bg-dna bg-dna-1" size={140} color="#73C52A" opacity={0.06} />
        <Dna className="bg-dna bg-dna-2" size={180} color="#0058B8" opacity={0.08} />
        <FlaskConical className="bg-flask" size={120} color="#73C52A" opacity={0.05} />
      </div>

      <div className="gallery-container">
        {/* Header Section */}
        <div className="gallery-header">
          <div className="gallery-tag-pill">
            <Sparkles size={14} color="#73C52A" />
            <span>OUR CUSTOMERS & MOMENTS</span>
          </div>
          <h2 className="gallery-main-title">
            Where Science <span className="title-highlight">Comes to Life</span>
          </h2>
          <p className="gallery-subtitle">
            Trusted by top schools and educational institutions. Explore the moments, experiments, workshops, and real experiences that make BioSpark special.
          </p>

          {/* DNA Decorative Divider */}
          <div className="gallery-divider">
            <span className="line"></span>
            <Dna size={20} color="#73C52A" className="rotating-dna" />
            <span className="line"></span>
          </div>
        </div>

        {/* Embedded Partner School Logos Banner */}
        {customersList.length > 0 && (
          <div className="partner-logos-strip">
            <span className="partner-strip-label">TRUSTED BY LEADING SCHOOLS</span>
            <div className="partner-logos-row">
              {customersList.map((cust, idx) => (
                <div key={cust._id || idx} className="partner-logo-item" title={cust.title || 'Partner School'}>
                  <img src={cust.imageUrl || cust.image} alt={cust.title || 'Partner'} onError={(e) => { e.target.src = '/main.png'; }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-Column Photo Collage Grid (Matching User Screenshot Layout) */}
        {loading ? (
          <div className="gallery-loading">Loading scientific moments...</div>
        ) : (
          <div className="gallery-3col-grid">
            {[col1, col2, col3].map((column, colIdx) => (
              <div key={colIdx} className="gallery-col">
                {column.map(({ item, idx, isTall }) => (
                  <div
                    key={item._id || idx}
                    className={`gallery-card ${isTall ? 'card-tall' : 'card-short'}`}
                    onClick={() => openLightbox(idx)}
                  >
                    <div className="card-image-wrapper">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="gallery-img"
                        onError={(e) => {
                          e.target.src = '/main.png';
                        }}
                      />
                      {/* Subtle Glass Overlay */}
                      <div className="card-glass-overlay">
                        <div className="view-badge">
                          <Eye size={16} />
                          <span>View</span>
                        </div>

                        <div className="card-details">
                          <span className="card-category-badge">{item.category}</span>
                          <h4 className="card-title">{item.title}</h4>
                          {item.description && (
                            <p className="card-desc">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Modal Component */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close Lightbox">
              <X size={24} />
            </button>

            {/* Prev Arrow */}
            <button className="lightbox-nav-btn prev" onClick={prevLightboxItem} aria-label="Previous Image">
              <ChevronLeft size={28} />
            </button>

            {/* Main Image View */}
            <div className="lightbox-image-box">
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                className="lightbox-img"
              />
              <div className="lightbox-caption">
                <div className="caption-header">
                  <span className="caption-category">{filteredItems[lightboxIndex].category}</span>
                  <span className="caption-counter">{lightboxIndex + 1} / {filteredItems.length}</span>
                </div>
                <h3>{filteredItems[lightboxIndex].title}</h3>
                {filteredItems[lightboxIndex].description && (
                  <p>{filteredItems[lightboxIndex].description}</p>
                )}
              </div>
            </div>

            {/* Next Arrow */}
            <button className="lightbox-nav-btn next" onClick={nextLightboxItem} aria-label="Next Image">
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}

      {/* CSS Styles */}
      <style>{`
        .gallery-section {
          position: relative;
          padding: 6rem 1.5rem;
          background: linear-gradient(135deg, #00122e 0%, #002b66 60%, #00193d 100%);
          overflow: hidden;
          color: #ffffff;
        }

        .gallery-bg-decorations {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .bg-dna-1 { position: absolute; top: 10%; left: -30px; transform: rotate(-15deg); }
        .bg-dna-2 { position: absolute; bottom: 12%; right: -40px; transform: rotate(25deg); }
        .bg-flask { position: absolute; top: 45%; right: 5%; }

        .gallery-container {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .gallery-tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1.2rem;
          border-radius: 999px;
          background: rgba(115, 197, 42, 0.12);
          border: 1px solid rgba(115, 197, 42, 0.3);
          color: #73C52A;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 1.2px;
          margin-bottom: 1rem;
        }

        .gallery-main-title {
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.8rem;
        }

        .title-highlight {
          color: #73C52A;
        }

        .gallery-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.75);
          max-width: 640px;
          margin: 0 auto 1.5rem;
          line-height: 1.6;
        }

        .gallery-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          max-width: 240px;
          margin: 0 auto;
        }

        .gallery-divider .line {
          height: 2px;
          flex-grow: 1;
          background: linear-gradient(90deg, transparent, rgba(115, 197, 42, 0.5), transparent);
        }

        .rotating-dna {
          animation: spinDNA 14s linear infinite;
        }

        @keyframes spinDNA {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Partner Logos Embedded Strip */
        .partner-logos-strip {
          margin-bottom: 3.5rem;
          padding: 1.8rem 2rem;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          text-align: center;
        }

        .partner-strip-label {
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #73C52A;
          display: block;
          margin-bottom: 1.2rem;
          text-transform: uppercase;
        }

        .partner-logos-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          flex-wrap: wrap;
        }

        .partner-logo-item {
          height: 50px;
          max-width: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: grayscale(100%) opacity(0.7);
          transition: all 0.3s ease;
        }

        .partner-logo-item:hover {
          filter: grayscale(0%) opacity(1);
          transform: scale(1.1);
        }

        .partner-logo-item img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }

        /* Category Filter Buttons */
        .gallery-filters {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }

        .filter-btn {
          padding: 0.6rem 1.4rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.8);
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .filter-btn:hover {
          background: rgba(115, 197, 42, 0.15);
          border-color: rgba(115, 197, 42, 0.4);
          color: #ffffff;
        }

        .filter-btn.active {
          background: #73C52A;
          border-color: #73C52A;
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(115, 197, 42, 0.35);
        }

        .gallery-loading {
          text-align: center;
          padding: 4rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
        }

        /* 3-Column Photo Collage Grid (Matching User Screenshot Layout) */
        .gallery-3col-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          max-width: 1240px;
          margin: 0 auto;
        }

        .gallery-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .gallery-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .gallery-card.card-tall {
          height: 480px;
        }

        .gallery-card.card-short {
          height: 250px;
        }

        .card-desc {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 0.3rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-card:hover {
          transform: translateY(-4px);
          border-color: rgba(115, 197, 42, 0.5);
          box-shadow: 0 20px 45px rgba(0, 88, 184, 0.35), 0 0 20px rgba(115, 197, 42, 0.2);
        }

        .gallery-card:hover .gallery-img {
          transform: scale(1.07);
        }

        /* Glass Overlay on Hover */
        .card-glass-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 18, 46, 0.9) 0%, rgba(0, 18, 46, 0.3) 50%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-card:hover .card-glass-overlay {
          opacity: 1;
        }

        .view-badge {
          align-self: flex-end;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          background: rgba(115, 197, 42, 0.9);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.8rem;
          box-shadow: 0 4px 12px rgba(115, 197, 42, 0.4);
          transform: translateY(-10px);
          transition: transform 0.3s ease;
        }

        .gallery-card:hover .view-badge {
          transform: translateY(0);
        }

        .card-details {
          transform: translateY(10px);
          transition: transform 0.3s ease;
        }

        .gallery-card:hover .card-details {
          transform: translateY(0);
        }

        .card-category-badge {
          font-size: 0.75rem;
          font-weight: 800;
          color: #73C52A;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 0.3rem;
        }

        .card-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.35;
        }

        /* Lightbox Modal */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 18, 46, 0.92);
          backdrop-filter: blur(12px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-modal {
          position: relative;
          max-width: 1050px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-close-btn {
          position: absolute;
          top: -3.5rem;
          right: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lightbox-close-btn:hover {
          background: #73C52A;
          color: #ffffff;
          transform: scale(1.1);
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(0, 88, 184, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.25s ease;
        }

        .lightbox-nav-btn:hover {
          background: #73C52A;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 0 20px rgba(115, 197, 42, 0.5);
        }

        .lightbox-nav-btn.prev { left: -4rem; }
        .lightbox-nav-btn.next { right: -4rem; }

        .lightbox-image-box {
          background: #00122e;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6);
          max-height: 85vh;
          display: flex;
          flex-direction: column;
        }

        .lightbox-img {
          max-height: 65vh;
          width: 100%;
          object-fit: contain;
          background: #000a1a;
        }

        .lightbox-caption {
          padding: 1.8rem 2.2rem;
          background: rgba(0, 18, 46, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .caption-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.6rem;
        }

        .caption-category {
          font-size: 0.8rem;
          font-weight: 800;
          color: #73C52A;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .caption-counter {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        .lightbox-caption h3 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.4rem;
        }

        .lightbox-caption p {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.6;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .gallery-card.card-tall { height: 380px; }
          .gallery-card.card-short { height: 210px; }
          .lightbox-nav-btn.prev { left: 0.5rem; }
          .lightbox-nav-btn.next { right: 0.5rem; }
        }

        @media (max-width: 768px) {
          .gallery-3col-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .gallery-col { gap: 1rem; }
          .gallery-col:nth-child(3) {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .gallery-card.card-tall { height: 300px; }
          .gallery-card.card-short { height: 200px; }

          .partner-logos-strip { padding: 1.2rem 1rem; }
          .partner-logos-row { gap: 1.5rem; }
          .partner-logo-item { height: 40px; }

          .lightbox-modal {
            padding: 0 1rem;
          }

          .lightbox-close-btn {
            top: -3rem;
            right: 0;
          }
        }

        @media (max-width: 576px) {
          .gallery-section { padding: 3.5rem 1rem; }
          .gallery-header { margin-bottom: 2rem; }
          .gallery-3col-grid {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .gallery-col {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .gallery-col:nth-child(3) {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .gallery-card.card-tall, .gallery-card.card-short {
            height: 240px;
          }
          .filter-btn {
            padding: 0.5rem 1rem;
            font-size: 0.78rem;
          }
          .lightbox-img { max-height: 50vh; }
          .lightbox-caption { padding: 1.2rem; }
          .lightbox-caption h3 { font-size: 1.1rem; }
        }
      `}</style>
    </section>
  );
}
