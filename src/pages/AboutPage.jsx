import React, { useState, useEffect } from 'react';
import { Building2, Users, FlaskConical, Globe, ChevronLeft, ChevronRight, Play, X, ArrowRight, GraduationCap, Award, Rocket, Microscope, UserCheck, Sparkles, Dna } from 'lucide-react';
import { FaLinkedin, FaFacebook, FaTiktok } from 'react-icons/fa';
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

      {/* 2. About the Founder Section */}
      <section className="who-we-are-section" id="who-we-are">
        <div className="founder-container">
          <div className="founder-grid">
            {/* Left Column: Founder Portrait */}
            <div className="founder-image-col">
              <div className="founder-card-frame">
                <div className="founder-image-wrapper">
                  <img 
                    src="/dr-zee.jpg" 
                    alt="Dr. Zee - Founder of BioSpark" 
                    className="founder-portrait"
                  />
                  <div className="founder-overlay-gradient"></div>
                </div>

                {/* Floating Badges */}
                <div className="founder-badge founder-badge-bottom">
                  <div className="badge-icon-spark">
                    <Sparkles size={18} color="#73C52A" />
                  </div>
                  <div>
                    <h4 className="badge-name">Dr. Zee</h4>
                    <p className="badge-role">Founder & Biotech Specialist</p>
                  </div>
                </div>

                <div className="founder-badge founder-badge-top">
                  <Dna size={16} color="#4CD6FF" />
                  <span>BioSpark Founder</span>
                </div>
              </div>
            </div>

            {/* Right Column: Information & Achievement Cards */}
            <div className="founder-content-col">
              <div className="founder-tag-pill">
                <Sparkles size={14} color="#73C52A" />
                <span>ABOUT THE FOUNDER</span>
              </div>

              <h2 className="founder-heading">
                BioSpark is more than a platform — <span className="gradient-text">we are a movement.</span>
              </h2>

              {/* Achievement Grid Cards */}
              <div className="founder-cards-grid">
                <div className="achievement-card">
                  <div className="achievement-icon-box">
                    <GraduationCap size={22} color="#73C52A" />
                  </div>
                  <div className="achievement-text">
                    <h4>B.Sc. in Biotechnology</h4>
                    <p>Faculty of Science, Excellent with Honors</p>
                  </div>
                </div>

                <div className="achievement-card">
                  <div className="achievement-icon-box">
                    <UserCheck size={22} color="#4CD6FF" />
                  </div>
                  <div className="achievement-text">
                    <h4>5+ Years Experience</h4>
                    <p>In Science Education & Practical Learning</p>
                  </div>
                </div>

                <div className="achievement-card">
                  <div className="achievement-icon-box">
                    <Microscope size={22} color="#73C52A" />
                  </div>
                  <div className="achievement-text">
                    <h4>4+ Years Science Comm.</h4>
                    <p>Simplifying Science & Interactive Workshops</p>
                  </div>
                </div>

                <div className="achievement-card">
                  <div className="achievement-icon-box">
                    <Award size={22} color="#FFD700" />
                  </div>
                  <div className="achievement-text">
                    <h4>Multiple National Awards</h4>
                    <p>In Science Communication & Innovation</p>
                  </div>
                </div>

                <div className="achievement-card achievement-card-full">
                  <div className="achievement-icon-box">
                    <Rocket size={22} color="#FF7A00" />
                  </div>
                  <div className="achievement-text">
                    <h4>Biotechnology Startup Founder</h4>
                    <p>Developing sustainable solutions for waste valorization</p>
                  </div>
                </div>
              </div>

              <div className="founder-cta-group">
                <button className="btn-primary founder-btn" onClick={() => navigate('/for-schools')}>
                  <span>Explore School Programs</span>
                  <ArrowRight size={18} />
                </button>
                <div className="founder-socials">
                  <a href="https://www.linkedin.com/in/zyad-khalil-856071288?trk=contact-info" target="_blank" rel="noopener noreferrer" className="founder-social-btn linkedin" aria-label="LinkedIn" title="LinkedIn">
                    <FaLinkedin size={18} />
                  </a>
                  <a href="https://www.facebook.com/share/1WK8z3N1bD/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="founder-social-btn facebook" aria-label="Facebook" title="Facebook">
                    <FaFacebook size={18} />
                  </a>
                  <a href="https://www.tiktok.com/@zyadmarcello?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="founder-social-btn tiktok" aria-label="TikTok" title="TikTok">
                    <FaTiktok size={18} />
                  </a>
                </div>
              </div>
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

        /* 2. About the Founder Section Redesign */
        .who-we-are-section {
          max-width: 1240px;
          margin: 0 auto 5rem;
          padding: 0 1.5rem;
        }

        .founder-container {
          position: relative;
          background: rgba(0, 22, 50, 0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 36px;
          padding: 3.5rem 3.5rem;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .founder-container::before {
          content: '';
          position: absolute;
          top: -30%; left: -20%;
          width: 60%; height: 60%;
          background: radial-gradient(circle, rgba(115, 197, 42, 0.18) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .founder-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 3.5rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* Founder Portrait Frame */
        .founder-card-frame {
          position: relative;
          max-width: 420px;
          margin: 0 auto;
        }

        .founder-image-wrapper {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          aspect-ratio: 4 / 5;
        }

        .founder-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          display: block;
          transition: transform 0.5s ease;
        }

        .founder-card-frame:hover .founder-portrait {
          transform: scale(1.04);
        }

        .founder-overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(1, 27, 78, 0.75) 0%, transparent 50%);
          pointer-events: none;
        }

        /* Floating Badges */
        .founder-badge {
          position: absolute;
          background: rgba(4, 28, 62, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
          z-index: 5;
        }

        .founder-badge-bottom {
          bottom: 1.5rem;
          left: -1rem;
          border-radius: 20px;
          padding: 0.8rem 1.4rem;
          display: flex;
          align-items: center;
          gap: 0.9rem;
          animation: floatSlowBadge 5s ease-in-out infinite alternate;
        }

        .badge-icon-spark {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(115, 197, 42, 0.18);
          border: 1px solid rgba(115, 197, 42, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .badge-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          line-height: 1.2;
        }

        .badge-role {
          font-size: 0.82rem;
          color: #94A3B8;
          margin: 0;
        }

        .founder-badge-top {
          top: 1.2rem;
          right: -1rem;
          border-radius: 99px;
          padding: 0.55rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          animation: floatSlowBadge 6s ease-in-out infinite alternate-reverse;
        }

        @keyframes floatSlowBadge {
          0% { transform: translateY(0); }
          100% { transform: translateY(-8px); }
        }

        /* Founder Content Column */
        .founder-tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.45rem 1.1rem;
          border-radius: 99px;
          background: rgba(115, 197, 42, 0.14);
          border: 1px solid rgba(115, 197, 42, 0.35);
          color: var(--accent-green);
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 1.2rem;
        }

        .founder-heading {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 800;
          line-height: 1.25;
          color: #ffffff;
          margin-bottom: 2rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #73C52A 0%, #4CD6FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Achievement Cards Grid */
        .founder-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.2rem;
          margin-bottom: 2rem;
        }

        .achievement-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.1rem 1.2rem;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .achievement-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(115, 197, 42, 0.35);
          transform: translateY(-4px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
        }

        .achievement-card-full {
          grid-column: 1 / -1;
          background: linear-gradient(90deg, rgba(115, 197, 42, 0.08) 0%, rgba(0, 139, 240, 0.08) 100%);
          border: 1px solid rgba(115, 197, 42, 0.25);
        }

        .achievement-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .achievement-text h4 {
          font-size: 0.98rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.2rem 0;
          line-height: 1.3;
        }

        .achievement-text p {
          font-size: 0.85rem;
          color: #CBD5E1;
          margin: 0;
          line-height: 1.4;
        }

        .founder-cta-group {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          flex-wrap: wrap;
        }

        .founder-btn {
          padding: 0.85rem 2rem;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
        }

        .founder-socials {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .founder-social-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .founder-social-btn:hover {
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
        }

        .founder-social-btn.linkedin:hover {
          background: #0A66C2;
          border-color: #0A66C2;
          color: #ffffff;
        }

        .founder-social-btn.facebook:hover {
          background: #1877F2;
          border-color: #1877F2;
          color: #ffffff;
        }

        .founder-social-btn.tiktok:hover {
          background: #EE1D52;
          border-color: #EE1D52;
          color: #ffffff;
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
          .who-we-are-grid, .founder-grid { grid-template-columns: 1fr; text-align: center; }
          .founder-container { padding: 2.5rem 1.8rem; border-radius: 28px; }
          .founder-card-frame { max-width: 360px; margin: 0 auto 1.5rem; }
          .founder-badge-bottom { left: 0.5rem; bottom: 0.8rem; }
          .founder-badge-top { right: 0.5rem; top: 0.8rem; }
          .founder-tag-pill { margin: 0 auto 1.2rem; }
          .learn-more-btn { margin: 0 auto; }
          .about-hero-card { padding: 3rem 2rem; }
          .carousel-arrow.prev { left: 0.5rem; }
          .carousel-arrow.next { right: 0.5rem; }
        }

        @media (max-width: 768px) {
          .about-hero-section, .who-we-are-section { padding: 0 1rem; }
          .about-hero-card { padding: 2.2rem 1.2rem; border-radius: 24px; }
          .hero-title { font-size: clamp(1.75rem, 5.5vw, 2.5rem); }
          .hero-subtitle { font-size: 0.98rem; }
          .founder-container { padding: 1.8rem 1.2rem; border-radius: 24px; }
          .founder-heading { font-size: 1.6rem; text-align: center; }
          .founder-cards-grid { grid-template-columns: 1fr; gap: 0.9rem; }
          .achievement-card { padding: 0.9rem 1rem; text-align: left; }
          .founder-cta-group { justify-content: center; }
          .founder-btn { width: 100%; justify-content: center; }
          .carousel-arrow { display: none; }
        }

        @media (max-width: 576px) {
          .metrics-grid { grid-template-columns: 1fr; }
          .about-hero-card { padding: 2rem 1rem; }
          .mascot-img { max-height: 260px; }
          .founder-badge-bottom { padding: 0.6rem 1rem; }
          .badge-name { font-size: 0.9rem; }
          .badge-role { font-size: 0.75rem; }
          .founder-badge-top { padding: 0.4rem 0.9rem; font-size: 0.75rem; }
        }
      `}</style>
    </div>
  );
}

