import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ChevronRight, Tent, CheckCircle2, Dna, Atom, Hexagon, Activity, FlaskConical } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { fetchCamps, fetchSiteContent } from '../services/api';
import Card3D from '../components/Card3D';

export default function Camps() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [whatsappNum, setWhatsappNum] = useState('201140866774');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchCamps({ active: true });
        if (res?.data?.data) {
          setCamps(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching camps:', err);
      } finally {
        setLoading(false);
      }

      try {
        const contentRes = await fetchSiteContent();
        if (contentRes?.data?.data?.contactInfo?.whatsappNumber) {
          setWhatsappNum(contentRes.data.data.contactInfo.whatsappNumber);
        }
      } catch (e) {}
    }
    loadData();
  }, []);

  const categories = ['All', ...new Set(camps.map(c => c.category).filter(Boolean))];

  const filteredCamps = selectedCategory === 'All' 
    ? camps 
    : camps.filter(c => c.category === selectedCategory);

  return (
    <div className="camps-page" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Animated Floating Bio Background (DNA, Cells, Proteins) */}
      <div className="camps-bg-anim">
        <Dna className="bio-anim-icon icon-dna-1" size={180} strokeWidth={0.8} />
        <Dna className="bio-anim-icon icon-dna-2" size={240} strokeWidth={0.6} />
        <Atom className="bio-anim-icon icon-cell-1" size={140} strokeWidth={0.8} />
        <Hexagon className="bio-anim-icon icon-protein-1" size={160} strokeWidth={0.8} />
        <Activity className="bio-anim-icon icon-cell-2" size={120} strokeWidth={0.8} />
        <FlaskConical className="bio-anim-icon icon-flask-1" size={200} strokeWidth={0.6} />
      </div>

      <section className="page-header" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section">
          <h1>BioSpark Educational Camps</h1>
          <p>
            Immersive biotechnology camps where students discover genetics, microbiology, and synthetic biology through exciting hands-on experiments.
          </p>
        </div>
      </section>

      {categories.length > 1 && (
        <section className="section filter-section" style={{ padding: '1rem 2rem', position: 'relative', zIndex: 2 }}>
          <div className="category-pills" style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button 
                key={cat} 
                className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'var(--accent-green)' : 'rgba(255, 255, 255, 0.08)',
                  color: selectedCategory === cat ? '#000' : '#E2E8F0',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="section camps-grid-section" style={{ position: 'relative', zIndex: 2 }}>
        {loading ? (
          <div className="loading-box glass-panel"><p>Loading camps...</p></div>
        ) : filteredCamps.length > 0 ? (
          <div className="grid-cards camps-grid">
            {filteredCamps.map((camp) => (
              <Card3D key={camp._id} className="camp-card">
                <div className="card-media">
                  <img src={camp.imageUrl || '/main.png'} alt={camp.title} onError={(e) => { e.target.src = '/main.png'; }} />
                  <span className="category-tag">{camp.category}</span>
                </div>
                <div className="card-content">
                  <h3>{camp.title}</h3>
                  <p>{camp.description}</p>

                  <div className="meta-list">
                    <div className="meta-item">
                      <Users size={16} color="#73C52A" />
                      <span>{camp.ageRange}</span>
                    </div>
                    <div className="meta-item">
                      <Clock size={16} color="#73C52A" />
                      <span>{camp.duration}</span>
                    </div>
                    <div className="meta-item">
                      <Calendar size={16} color="#73C52A" />
                      <span>{camp.dates}</span>
                    </div>
                    <div className="meta-item">
                      <MapPin size={16} color="#73C52A" />
                      <span>{camp.location}</span>
                    </div>
                  </div>

                  <div className="card-footer" style={{ flexDirection: 'column', gap: '0.8rem', alignItems: 'stretch' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="price-tag">
                        {camp.price > 0 ? `$${camp.price}` : 'Inquire for Pricing'}
                      </div>
                      <Link to={`/camps/${camp.slug || camp._id}`} style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>
                        View Details &rarr;
                      </Link>
                    </div>
                    
                    <a 
                      href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hello BioSpark, I would like to register for the camp: ${camp.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ justifyContent: 'center', width: '100%' }}
                    >
                      <FaWhatsapp size={18} style={{ marginRight: '8px' }} />
                      <span>Register via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        ) : (
          <div className="empty-box glass-panel">
            <h3>No active camps found at the moment.</h3>
            <p>Please check back soon or contact us for custom camp inquiries.</p>
          </div>
        )}
      </section>

      <style>{`
        .camps-page {
          padding-top: 6rem;
        }

        .camps-bg-anim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .bio-anim-icon {
          position: absolute;
          color: rgba(255, 255, 255, 0.04);
          filter: drop-shadow(0 0 10px rgba(0, 139, 240, 0.15));
        }

        .icon-dna-1 { top: 5%; right: -2%; animation: floatDna1 12s ease-in-out infinite alternate; }
        .icon-dna-2 { bottom: 10%; left: -3%; animation: floatDna2 15s ease-in-out infinite alternate; }
        .icon-cell-1 { top: 35%; left: 5%; animation: floatCell1 10s ease-in-out infinite alternate; }
        .icon-protein-1 { top: 60%; right: 5%; animation: floatProtein1 14s ease-in-out infinite alternate; }
        .icon-cell-2 { bottom: 30%; right: 15%; animation: floatCell2 11s ease-in-out infinite alternate; }
        .icon-flask-1 { top: 15%; left: 45%; animation: floatFlask 16s ease-in-out infinite alternate; }

        @keyframes floatDna1 {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-40px) rotate(25deg); }
        }
        @keyframes floatDna2 {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(35px) rotate(-20deg); }
        }
        @keyframes floatCell1 {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-30px) scale(1.1); }
        }
        @keyframes floatProtein1 {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-35px) rotate(30deg); }
        }
        @keyframes floatCell2 {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(25px) scale(1.15); }
        }
        @keyframes floatFlask {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(-15deg); }
        }

        .page-header {
          text-align: center;
          padding: 4rem 0 2rem;
        }

        .page-header h1 {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          margin-bottom: 1rem;
        }

        .page-header p {
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.15rem;
          color: var(--text-secondary);
        }

        .camps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1280px;
          margin: 0 auto;
        }

        .camp-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border-radius: 24px;
          background: rgba(0, 20, 50, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: all 0.4s ease;
        }

        .camp-card:hover {
          border-color: rgba(101, 169, 46, 0.4);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45), 0 0 25px rgba(101, 169, 46, 0.25);
          transform: translateY(-8px);
        }

        .card-media {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(0, 20, 50, 0.6) 0%, rgba(5, 40, 80, 0.4) 100%);
        }

        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .camp-card:hover .card-media img {
          transform: scale(1.08);
        }

        .category-tag {
          position: absolute;
          top: 14px;
          right: 14px;
          background: linear-gradient(135deg, var(--accent-green), #84c233);
          color: #000000;
          font-weight: 800;
          font-size: 0.78rem;
          padding: 6px 14px;
          border-radius: 999px;
          box-shadow: 0 4px 15px rgba(101, 169, 46, 0.4);
        }

        .card-content {
          padding: 1.8rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-content h3 {
          font-size: 1.35rem;
          color: #ffffff;
          font-weight: 700;
          margin-bottom: 0.8rem;
          line-height: 1.3;
        }

        .card-content p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          line-height: 1.65;
          flex-grow: 1;
        }

        .meta-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem;
          margin-bottom: 1.6rem;
          padding: 1.1rem;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #ffffff;
        }

        .card-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .price-tag {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--accent-green);
        }
      `}</style>
    </div>
  );
}
