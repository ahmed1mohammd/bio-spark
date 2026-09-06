import React, { useState, useEffect } from 'react';
import { Building2, Users, FlaskConical, Globe, ChevronLeft, ChevronRight, Play, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchSiteContent, fetchCarousels } from '../services/api';
import BoardMembers from '../components/BoardMembers';
import GallerySection from '../components/GallerySection';

const DEFAULT_ABOUT_SLIDES = [
  {
    tag: 'ABOUT BIOSPARK',
    headline: 'Inspiring the Next Generation of Scientists',
    subtitle: 'We bring biotechnology to life through hands-on learning, curiosity, and innovation.',
    primaryBtnText: 'Our Mission',
    primaryBtnLink: '#who-we-are',
    image: '/About.png'
  },
  {
    tag: 'HANDS-ON BIOTECH',
    headline: 'Empowering Students with Real Science Experience',
    subtitle: 'Authentic DNA extraction, PCR amplification, and gel electrophoresis right in your classroom.',
    primaryBtnText: 'Explore Workshops',
    primaryBtnLink: '/workshops',
    image: '/spark_character.png'
  },
  {
    tag: 'FOR SCHOOLS & STEM',
    headline: 'Bringing Mobile Labs Directly to Your Campus',
    subtitle: 'State-of-the-art portable biological laboratories designed for K-12 educational excellence.',
    primaryBtnText: 'For Schools',
    primaryBtnLink: '/for-schools',
    image: '/herosec.png'
  }
];

export default function AboutPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [aboutSlides, setAboutSlides] = useState(DEFAULT_ABOUT_SLIDES);
  const [aboutContent, setAboutContent] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetchSiteContent();
        if (res?.data?.data?.about) {
          setAboutContent(res.data.data.about);
        }
      } catch (err) {
        console.error('Failed to load about site content:', err);
      }

      try {
        const carRes = await fetchCarousels({ page: 'about' });
        if (carRes?.data?.data && carRes.data.data.length > 0) {
          const mapped = carRes.data.data.map(s => ({
            tag: s.eyebrow || 'ABOUT BIOSPARK',
            headline: s.headline || s.title,
            subtitle: s.description || s.subtitle,
            primaryBtnText: s.primaryBtnText || 'Our Mission',
            primaryBtnLink: s.primaryBtnLink || '#who-we-are',
            image: s.imageUrl || s.image || '/About.png'
          }));
          setAboutSlides(mapped);
        }
      } catch (err) {
        console.warn('Could not load dynamic about carousels:', err);
      }
    }
    loadContent();
  }, []);

  // Carousel timer
  useEffect(() => {
    if (!aboutSlides.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % aboutSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [aboutSlides.length]);

  const handleNextSlide = () => {
    if (!aboutSlides.length) return;
    setCurrentSlide((prev) => (prev + 1) % aboutSlides.length);
  };

  const handlePrevSlide = () => {
    if (!aboutSlides.length) return;
    setCurrentSlide((prev) => (prev - 1 + aboutSlides.length) % aboutSlides.length);
  };

  const handlePrimaryClick = (link) => {
    if (!link) return;
    if (link.startsWith('#')) {
      const el = document.querySelector(link);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(link);
    }
  };

  const slide = aboutSlides[currentSlide] || DEFAULT_ABOUT_SLIDES[0];

  return (
    <div className="about-page-container">
      {/* 1. Hero Carousel Section */}
      <section className="about-hero-section">
        <div className="glass-panel about-hero-card">
          {/* Left / Right Nav Arrows */}
          <button className="carousel-arrow prev" onClick={handlePrevSlide} aria-label="Previous Slide">
            <ChevronLeft size={22} />
          </button>
          <button className="carousel-arrow next" onClick={handleNextSlide} aria-label="Next Slide">
            <ChevronRight size={22} />
          </button>

          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <span className="hero-tag">{slide.tag}</span>
              <h1 className="hero-title">
                {slide.headline}
              </h1>
              <p className="hero-subtitle">{slide.subtitle}</p>

              <div className="hero-actions">
                <button className="btn-primary hero-mission-btn" onClick={() => handlePrimaryClick(slide.primaryBtnLink)}>
                  {slide.primaryBtnText}
                </button>
              </div>
            </div>

            {/* Right Character / Mascot Graphic */}
            <div className="hero-graphic">
              <div className="graphic-glow-backdrop"></div>
              <img 
                src={slide.image} 
                alt="BioSpark Characters" 
                className="mascot-img"
                onError={(e) => { e.target.src = '/spark_character.png'; }}
              />
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="carousel-dots">
            {aboutSlides.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Who We Are & Metrics Section */}
      <section className="who-we-are-section" id="who-we-are">
        <div className="who-we-are-grid">
          {/* Left Column Text */}
          <div className="who-text-col">
            <span className="who-tag">Who We Are</span>
            <h2 className="who-title">
              BioSpark is more than a platform — <span className="text-green">we are a movement.</span>
            </h2>
            <p className="who-description">
              {aboutContent?.story || 'We empower schools and students with innovative biotechnology education through mobile labs, interactive content, and real-world experiences.'}
            </p>
            <button className="learn-more-btn" onClick={() => navigate('/for-schools')}>
              <span>Learn More About Us</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Column Stats Cards */}
          <div className="metrics-grid">
            <div className="metric-card glass-panel interactive">
              <div className="metric-icon-box">
                <Building2 size={30} color="var(--accent-green)" />
              </div>
              <h3 className="metric-number">150+</h3>
              <p className="metric-label">Schools Empowered</p>
            </div>

            <div className="metric-card glass-panel interactive">
              <div className="metric-icon-box">
                <Users size={30} color="var(--accent-green)" />
              </div>
              <h3 className="metric-number">10K+</h3>
              <p className="metric-label">Students Reached</p>
            </div>

            <div className="metric-card glass-panel interactive">
              <div className="metric-icon-box">
                <FlaskConical size={30} color="var(--accent-green)" />
              </div>
              <h3 className="metric-number">200+</h3>
              <p className="metric-label">Workshops Conducted</p>
            </div>

            <div className="metric-card glass-panel interactive">
              <div className="metric-icon-box">
                <Globe size={30} color="var(--accent-green)" />
              </div>
              <h3 className="metric-number">15+</h3>
              <p className="metric-label">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GALLERY SECTION (معرض الأعمال) */}
      <GallerySection />

      {/* 4. OUR LEADERSHIP (Meet the BioSpark Board) */}
      <section className="board-section">
        <BoardMembers />
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="video-modal-backdrop" onClick={() => setIsVideoModalOpen(false)}>
          <div className="video-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setIsVideoModalOpen(false)}>
              <X size={24} />
            </button>
            <div className="video-responsive">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="BioSpark Story Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Styled JSX */}
      <style>{`
        .about-page-container {
          padding-top: 5.5rem;
          padding-bottom: 5rem;
          min-height: 100vh;
          background: 
            radial-gradient(circle at 85% 15%, rgba(101, 169, 46, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 15% 85%, rgba(0, 139, 240, 0.18) 0%, transparent 65%),
            linear-gradient(135deg, #011b4e 0%, #003270 100%);
          background-attachment: fixed;
          color: #ffffff;
        }

        .text-green {
          color: var(--accent-green);
        }

        /* 1. Hero Carousel Card */
        .about-hero-section {
          max-width: 1240px;
          margin: 0 auto 5rem;
          padding: 0 1.5rem;
        }

        .about-hero-card {
          position: relative;
          border-radius: 32px;
          padding: 3.5rem 4rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
          overflow: hidden;
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0, 85, 185, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.25s ease;
        }

        .carousel-arrow:hover {
          background: var(--accent-green);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 0 15px rgba(101, 169, 46, 0.5);
        }

        .carousel-arrow.prev { left: 1.2rem; }
        .carousel-arrow.next { right: 1.2rem; }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .hero-tag {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--accent-green);
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 0.8rem;
        }

        .hero-title {
          font-size: clamp(2.2rem, 3.8vw, 3.4rem);
          font-weight: 800;
          line-height: 1.2;
          color: #ffffff;
          margin-bottom: 1.2rem;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2.2rem;
          max-width: 540px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .hero-mission-btn {
          padding: 0.85rem 2.2rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: 1rem;
          box-shadow: 0 10px 25px rgba(101, 169, 46, 0.35);
        }

        .watch-story-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          border: none;
          color: #ffffff;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .watch-story-btn:hover {
          color: var(--accent-green);
        }

        .play-icon-circle {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #0055b9;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 85, 185, 0.4);
          transition: transform 0.25s ease;
        }

        .watch-story-btn:hover .play-icon-circle {
          transform: scale(1.15);
          background: var(--accent-green);
        }

        .hero-graphic {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .graphic-glow-backdrop {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(101, 169, 46, 0.25) 0%, rgba(0, 139, 240, 0.2) 50%, transparent 70%);
          filter: blur(30px);
          z-index: 1;
        }

        .mascot-img {
          position: relative;
          z-index: 2;
          max-height: 360px;
          width: 100%;
          object-fit: contain;
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4));
          transition: transform 0.4s ease;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 0.6rem;
          margin-top: 2rem;
        }

        .carousel-dots .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-dots .dot.active {
          width: 28px;
          border-radius: 12px;
          background: var(--accent-green);
        }

        /* 2. Who We Are Section */
        .who-we-are-section {
          max-width: 1240px;
          margin: 0 auto 5rem;
          padding: 0 1.5rem;
        }

        .who-we-are-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 4rem;
          align-items: center;
        }

        .who-tag {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--accent-green);
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 0.6rem;
        }

        .who-title {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 800;
          line-height: 1.25;
          margin-bottom: 1.2rem;
        }

        .who-description {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .learn-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.8rem 1.8rem;
          border-radius: 999px;
          background: transparent;
          border: 2px solid var(--accent-green);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .learn-more-btn:hover {
          background: var(--accent-green);
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(101, 169, 46, 0.4);
          transform: translateY(-2px);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .metric-card {
          border-radius: 20px;
          padding: 2.2rem 1.5rem;
          text-align: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          transform: translateY(-5px);
          border-color: rgba(101, 169, 46, 0.4);
          box-shadow: 0 15px 35px rgba(0, 139, 240, 0.25);
        }

        .metric-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: rgba(101, 169, 46, 0.15);
          border: 1px solid rgba(101, 169, 46, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .metric-number {
          font-size: 2.2rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.3rem;
        }

        .metric-label {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        /* 3. Board Section */
        .board-section {
          max-width: 1240px;
          margin: 0 auto;
        }

        /* Video Modal */
        .video-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .video-modal-content {
          position: relative;
          width: 100%;
          max-width: 850px;
          border-radius: 24px;
          overflow: hidden;
          background: #001428;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
        }

        .close-modal-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: #ffffff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }

        .video-responsive {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          overflow: hidden;
        }

        .video-responsive iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .hero-grid { grid-template-columns: 1fr; text-align: center; }
          .hero-subtitle { margin: 0 auto 2rem; }
          .hero-actions { justify-content: center; }
          .who-we-are-grid { grid-template-columns: 1fr; text-align: center; }
          .learn-more-btn { margin: 0 auto; }
          .about-hero-card { padding: 3rem 2rem; }
        }

        @media (max-width: 576px) {
          .metrics-grid { grid-template-columns: 1fr; }
          .about-hero-card { padding: 2.5rem 1.2rem; }
          .carousel-arrow { display: none; }
        }
      `}</style>
    </div>
  );
}

