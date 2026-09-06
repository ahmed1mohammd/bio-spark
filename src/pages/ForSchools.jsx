import React, { useState, useEffect, useRef } from 'react';
import { Building2, Truck, Sparkles, BookOpen, Send, CheckCircle, ChevronRight, ChevronLeft, Dna, Sliders } from 'lucide-react';
import { submitSchoolInquiry, fetchPrograms, fetchCarousels } from '../services/api';
import GallerySection from '../components/GallerySection';

const DEFAULT_HERO_SLIDES = [
  {
    eyebrow: "BIOTECHNOLOGY FOR SCHOOLS",
    headline: "Bring BioSpark to Your School",
    description: "Transform science education through hands-on biotechnology, mobile labs, and engaging STEM experiences.",
    primaryBtnText: "Book for Your School",
    primaryBtnLink: "#inquiry-form",
    secondaryBtnText: "Explore Programs",
    secondaryBtnLink: ".categories-section",
    imageUrl: "/herosec.png",
    alt: "BioSpark Mobile School Laboratory"
  },
  {
    eyebrow: "NEXT-GEN STEM EDUCATION",
    headline: "Science That Comes Alive in Classrooms",
    description: "Empower students with real-world biology experiments, DNA extraction, and state-of-the-art scientific equipment.",
    primaryBtnText: "Request a Workshop",
    primaryBtnLink: "#inquiry-form",
    secondaryBtnText: "View Offerings",
    secondaryBtnLink: ".categories-section",
    imageUrl: "/main.png",
    alt: "BioSpark Interactive Workshop"
  },
  {
    eyebrow: "MEET SPARKY & THE TEAM",
    headline: "Inspire the Next Generation of Scientists",
    description: "Our expert mentors and friendly mascots bring excitement, curiosity, and deep discovery to every school event.",
    primaryBtnText: "Schedule a Demo Day",
    primaryBtnLink: "#inquiry-form",
    secondaryBtnText: "Contact Us",
    secondaryBtnLink: "/contact",
    imageUrl: "/spark_character.png",
    alt: "Sparky Mascot and BioSpark Team"
  },
  {
    eyebrow: "TAILORED SCHOOL CURRICULA",
    headline: "Hands-on Bio Labs Built for Your Curriculum",
    description: "Customized module packages designed for IGCSE, IB, American Diploma, and National STEM standards.",
    primaryBtnText: "Get Custom Curriculum",
    primaryBtnLink: "#inquiry-form",
    secondaryBtnText: "See All Programs",
    secondaryBtnLink: ".categories-section",
    imageUrl: "/About.png",
    alt: "BioSpark Educational Lab"
  }
];

// --- 3D Card Component for School Offerings ---
const SchoolCard3D = ({ cat, onSelect }) => {
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
      className="school-card-3d-wrapper"
      style={{ perspective: '1000px', height: '100%', display: 'flex', flexDirection: 'column' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="glass-panel interactive school-card-3d-inner"
        style={{
          transform: `rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg) scale3d(${style.scale}, ${style.scale}, ${style.scale})`,
          transition: style.isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: style.isHovered
            ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 139, 240, 0.35)'
            : 'var(--glass-shadow)',
          borderColor: style.isHovered ? 'rgba(255, 255, 255, 0.4)' : 'var(--glass-border)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Holographic Glare */}
        <div
          className="glare-overlay"
          style={{
            background: `radial-gradient(circle at ${style.glareX}% ${style.glareY}%, rgba(255, 255, 255, ${style.glareOpacity}) 0%, rgba(255, 255, 255, 0) 70%)`,
          }}
        />

        {/* 3D Depth Layer 1: Icon Header */}
        <div className="icon-header-3d">
          <div className="icon-box-3d">
            {cat.icon || <Building2 size={34} color="var(--accent-green)" />}
          </div>
        </div>

        {/* 3D Depth Layer 2: Content */}
        <div className="school-card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <h3 className="school-card-title">{cat.title}</h3>
          <p className="school-card-desc" style={{ flexGrow: 1 }}>{cat.desc}</p>
          
          {(cat.targetGrades || cat.duration) && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.2rem', fontSize: '0.85rem', color: '#fff' }}>
              {cat.targetGrades && <span style={{ padding: '0.25rem 0.65rem', borderRadius: '8px', background: 'rgba(101,169,46,0.2)', border: '1px solid rgba(101,169,46,0.4)' }}>🎯 {cat.targetGrades}</span>}
              {cat.duration && <span style={{ padding: '0.25rem 0.65rem', borderRadius: '8px', background: 'rgba(0,139,240,0.2)', border: '1px solid rgba(0,139,240,0.4)' }}>⏱️ {cat.duration}</span>}
            </div>
          )}

          <button 
            className="btn-primary card-cta-btn" 
            style={{ marginTop: 'auto' }}
            onClick={() => onSelect(cat.title)}
          >
            <span>Request for School</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const defaultCategories = [
  {
    title: 'School Workshops',
    icon: <Building2 size={34} color="var(--accent-green)" />,
    desc: 'Interactive, curriculum-aligned biotechnology and biology workshops conducted right in your school science laboratories or classrooms.'
  },
  {
    title: 'Mobile Bio Lab',
    icon: <Truck size={34} color="var(--accent-green)" />,
    desc: 'BioSpark brings a complete portable biotechnology laboratory directly to your school campus, fully equipped with centrifuges, PCR, and gel electrophoresis.'
  },
  {
    title: 'Science Days & Fairs',
    icon: <Sparkles size={34} color="var(--accent-green)" />,
    desc: 'Large-scale interactive scientific booths, live demonstrations, 3D molecular modeling, and rapid experiments for school annual science fairs.'
  },
  {
    title: 'Custom Curricula Programs',
    icon: <BookOpen size={34} color="var(--accent-green)" />,
    desc: 'Tailored biotechnology programs customized according to student age group, specific STEM curricula (IGCSE, IB, American Diploma), and school schedules.'
  }
];

export default function ForSchools() {
  const [categories, setCategories] = useState(defaultCategories);
  const [heroSlides, setHeroSlides] = useState(DEFAULT_HERO_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    async function loadCarousels() {
      try {
        const res = await fetchCarousels({ page: 'for-schools' });
        if (res?.data?.data && res.data.data.length > 0) {
          const mapped = res.data.data.map(slide => ({
            eyebrow: slide.eyebrow || 'BIOTECHNOLOGY FOR SCHOOLS',
            headline: slide.headline || slide.title,
            description: slide.description || slide.subtitle,
            primaryBtnText: slide.primaryBtnText || 'Book for Your School',
            primaryBtnLink: slide.primaryBtnLink || '#inquiry-form',
            secondaryBtnText: slide.secondaryBtnText || 'Explore Offerings',
            secondaryBtnLink: slide.secondaryBtnLink || '.categories-section',
            imageUrl: slide.imageUrl || slide.image || '/herosec.png',
            alt: slide.headline || 'BioSpark School Slide'
          }));
          setHeroSlides(mapped);
        }
      } catch (err) {
        console.warn('Could not load dynamic carousels for ForSchools, using default slides:', err);
      }
    }
    loadCarousels();
  }, []);

  const [formData, setFormData] = useState({
    schoolName: '',
    contactPerson: '',
    email: '',
    phone: '',
    studentCount: '50-100',
    studentGrade: 'Middle School (Grades 6-8)',
    interestedProgram: 'School Workshops',
    preferredDate: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-play carousel interval
  useEffect(() => {
    if (isPaused || !heroSlides.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  const handleNextSlide = () => {
    if (!heroSlides.length) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    if (!heroSlides.length) return;
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNextSlide();
    } else if (diff < -50) {
      handlePrevSlide();
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const res = await fetchPrograms({ active: true });
        const programsArray = res?.data?.data || (Array.isArray(res?.data) ? res.data : []);
        if (programsArray.length > 0) {
          const mapped = programsArray.map(p => {
            const titleLower = (p.title || p.name || '').toLowerCase();
            let iconElement = <Building2 size={34} color="var(--accent-green)" />;
            if (titleLower.includes('mobile') || titleLower.includes('lab') || titleLower.includes('truck')) {
              iconElement = <Truck size={34} color="var(--accent-green)" />;
            } else if (titleLower.includes('fair') || titleLower.includes('event') || titleLower.includes('sparkle') || titleLower.includes('day')) {
              iconElement = <Sparkles size={34} color="var(--accent-green)" />;
            } else if (titleLower.includes('curricul') || titleLower.includes('custom') || titleLower.includes('program') || titleLower.includes('book')) {
              iconElement = <BookOpen size={34} color="var(--accent-green)" />;
            }

            return {
              id: p._id || p.id,
              title: p.title || p.name,
              desc: p.shortDescription || p.description || p.fullDescription || p.desc,
              targetGrades: p.targetGrades || p.ageGroup,
              duration: p.duration,
              image: p.imageUrl || p.image,
              icon: iconElement
            };
          });
          setCategories(mapped);
        }
      } catch (err) {
        console.warn('Could not load dynamic programs from API, fallback to default categories:', err);
      }
    };
    loadPrograms();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToInquiry = (programTitle) => {
    if (programTitle) {
      setFormData(prev => ({ ...prev, interestedProgram: programTitle }));
    }
    const formEl = document.getElementById('inquiry-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = (link) => {
    if (!link) {
      scrollToInquiry();
      return;
    }
    if (link.startsWith('#')) {
      const el = document.querySelector(link);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else scrollToInquiry();
    } else if (link.startsWith('.')) {
      const el = document.querySelector(link);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = link;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      await submitSchoolInquiry(formData);
      setSubmitted(true);
      setFormData({
        schoolName: '',
        contactPerson: '',
        email: '',
        phone: '',
        studentCount: '50-100',
        studentGrade: 'Middle School (Grades 6-8)',
        interestedProgram: 'School Workshops',
        preferredDate: '',
        message: ''
      });
    } catch (err) {
      setErrorMsg(err?.response?.data?.error || 'Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const slide = heroSlides[currentSlide] || DEFAULT_HERO_SLIDES[0];

  return (
    <div className="for-schools-page">
      {/* Hero Carousel Section (Styled Identically to About Page) */}
      <section 
        className="about-hero-section schools-hero-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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
              <span className="hero-tag">{slide.eyebrow}</span>
              <h1 className="hero-title">{slide.headline}</h1>
              <p className="hero-subtitle">{slide.description}</p>

              <div className="hero-actions">
                <button className="btn-primary hero-mission-btn" onClick={() => handleCtaClick(slide.primaryBtnLink)}>
                  <span>{slide.primaryBtnText || slide.primaryBtn || 'Book for Your School'}</span>
                  <ChevronRight size={18} style={{ marginLeft: '6px' }} />
                </button>
                
                {(slide.secondaryBtnText || slide.secondaryBtn) && (
                  <button className="hero-cta-secondary" onClick={() => handleCtaClick(slide.secondaryBtnLink)}>
                    <span>{slide.secondaryBtnText || slide.secondaryBtn}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Character / Mascot Graphic */}
            <div className="hero-graphic">
              <div className="graphic-glow-backdrop"></div>
              <img 
                src={slide.imageUrl || slide.image} 
                alt={slide.headline} 
                className="mascot-img"
                onError={(e) => { e.target.src = '/main.png'; }}
              />
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="carousel-dots">
            {heroSlides.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Program Categories in 3D Cards */}
      <section className="section categories-section">
        <h2 style={{ marginBottom: '2.5rem' }}>School Program <span style={{ color: 'var(--light-blue)' }}>Offerings</span></h2>
        <div className="schools-3d-grid">
          {categories.map((cat, idx) => (
            <SchoolCard3D 
              key={idx} 
              cat={cat} 
              onSelect={scrollToInquiry}
            />
          ))}
        </div>
      </section>

      {/* How It Works Section (3-Step Process) */}
      <section className="how-it-works-section section">
        <div className="how-it-works-container">
          <span className="section-eyebrow">SIMPLE & SEAMLESS PROCESS</span>
          <h2 className="section-title">How It <span className="text-green">Works</span></h2>
          <p className="section-subtitle">Bringing state-of-the-art mobile biotechnology labs and workshops to your school in 3 easy steps.</p>

          <div className="process-grid-3steps">
            {/* Step 1 */}
            <div className="process-step-card glass-panel">
              <div className="step-badge">01</div>
              <div className="step-icon-box">
                <Send size={28} color="var(--accent-green)" />
              </div>
              <h3 className="step-title">Tell us your needs</h3>
              <p className="step-desc">Share your school's curriculum goals, student age group, preferred topics, and dates through our quick inquiry form.</p>
            </div>

            <div className="step-connector-arrow">
              <ChevronRight size={32} color="var(--accent-green)" />
            </div>

            {/* Step 2 */}
            <div className="process-step-card glass-panel">
              <div className="step-badge">02</div>
              <div className="step-icon-box">
                <Sliders size={28} color="var(--accent-green)" />
              </div>
              <h3 className="step-title">We design the experience</h3>
              <p className="step-desc">Our scientific advisors tailor the lab modules, equipment, and experiments specifically for your students and standards.</p>
            </div>

            <div className="step-connector-arrow">
              <ChevronRight size={32} color="var(--accent-green)" />
            </div>

            {/* Step 3 */}
            <div className="process-step-card glass-panel">
              <div className="step-badge">03</div>
              <div className="step-icon-box">
                <Truck size={28} color="var(--accent-green)" />
              </div>
              <h3 className="step-title">We bring BioSpark to your school</h3>
              <p className="step-desc">Our mobile laboratory arrives on-campus fully equipped, with expert scientific mentors delivering an unforgettable hands-on lab day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section (Same design as About page) */}
      <GallerySection />

      {/* CTA Banner Section */}
      <section className="schools-cta-section">
        <div className="glass-panel cta-card">
          <div className="cta-content">
            <span className="cta-tag">GET STARTED TODAY</span>
            <h2 className="cta-title">Bring BioSpark to Your School</h2>
            <p className="cta-subtitle">Request a customized program for your school and inspire the next generation of scientists.</p>
            <button className="btn-primary cta-btn" onClick={() => scrollToInquiry()}>
              <span>Request a Customized Program</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="section inquiry-section" id="inquiry-form">
        <div className="glass-panel inquiry-container">
          <div className="inquiry-header">
            <h2>Request BioSpark for Your School</h2>
            <p>Fill out the inquiry form below and our educational coordination team will contact you within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="success-message">
              <CheckCircle size={54} color="var(--accent-green)" />
              <h3>Inquiry Received!</h3>
              <p>Thank you for reaching out. Our school program specialist will review your request and get back to you shortly.</p>
              <button className="btn-primary" onClick={() => setSubmitted(false)}>Submit Another Request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="school-form">
              {errorMsg && <div className="error-box">{errorMsg}</div>}

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="schoolName">School / Institution Name *</label>
                  <input 
                    type="text" 
                    id="schoolName" 
                    name="schoolName" 
                    required 
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="e.g. St. George International School"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactPerson">Contact Person & Title *</label>
                  <input 
                    type="text" 
                    id="contactPerson" 
                    name="contactPerson" 
                    required 
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Sarah Hassan (Head of Science)"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. sarah@school.edu"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +20 100 123 4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="studentCount">Number of Students</label>
                  <select 
                    id="studentCount" 
                    name="studentCount" 
                    value={formData.studentCount}
                    onChange={handleChange}
                  >
                    <option value="Under 30">Under 30 Students</option>
                    <option value="30-50">30 - 50 Students</option>
                    <option value="50-100">50 - 100 Students</option>
                    <option value="100-200">100 - 200 Students</option>
                    <option value="200+">200+ Students</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="studentGrade">Student Grade / Age Level</label>
                  <select 
                    id="studentGrade" 
                    name="studentGrade" 
                    value={formData.studentGrade}
                    onChange={handleChange}
                  >
                    <option value="Primary School (Grades 1-5)">Primary School (Grades 1-5)</option>
                    <option value="Middle School (Grades 6-8)">Middle School (Grades 6-8)</option>
                    <option value="High School (Grades 9-12)">High School (Grades 9-12)</option>
                    <option value="University / STEM Club">University / STEM Club</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="interestedProgram">Interested Program</label>
                  <select 
                    id="interestedProgram" 
                    name="interestedProgram" 
                    value={formData.interestedProgram}
                    onChange={handleChange}
                  >
                    <option value="School Workshops">School Workshops</option>
                    <option value="Mobile Bio Lab">Mobile Bio Lab</option>
                    <option value="Science Days & Fairs">Science Days & Fairs</option>
                    <option value="Custom Curricula Programs">Custom Curricula Programs</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="preferredDate">Preferred Date / Month</label>
                  <input 
                    type="text" 
                    id="preferredDate" 
                    name="preferredDate" 
                    value={formData.preferredDate}
                    onChange={handleChange}
                    placeholder="e.g. October 2026 or Spring Term"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Educational Goals & Special Requirements</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your curriculum goals, student background, or preferred scientific topics..."
                  ></textarea>
                </div>
              </div>

              <button type="submit" disabled={submitting} className="btn-primary submit-btn">
                <Send size={18} />
                <span>{submitting ? 'Submitting...' : 'Submit School Inquiry'}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      <style>{`
        .for-schools-page {
          padding-top: 5rem;
          min-height: 100vh;
          background: 
            radial-gradient(circle at 90% 10%, rgba(115, 197, 42, 0.12) 0%, transparent 70%),
            radial-gradient(circle at 10% 80%, rgba(0, 88, 184, 0.2) 0%, transparent 70%),
            linear-gradient(135deg, #001a40 0%, #012b7d 100%);
          background-attachment: fixed;
          color: var(--text-primary);
        }

        /* Hero Carousel Card (Styled Identically to About Page) */
        .schools-hero-section {
          max-width: 1240px;
          margin: 0 auto 3rem;
          padding: 2rem 1.5rem 0;
          position: relative;
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

        .hero-cta-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-weight: 600;
          padding: 0.85rem 1.8rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }

        .hero-cta-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: #ffffff;
          transform: translateY(-2px);
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

        @media (max-width: 992px) {
          .about-hero-card {
            padding: 2.5rem 1.5rem;
          }
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
          }
        }

        /* 3D Grid for Schools */
        .schools-3d-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .schools-3d-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .school-card-3d-wrapper {
          height: 100%;
        }

        .school-card-3d-inner {
          position: relative;
          height: 100%;
          border-radius: var(--card-radius);
          padding: 2.2rem 2rem;
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
          box-sizing: border-box;
          overflow: hidden;
        }

        .glare-overlay {
          position: absolute;
          inset: 0;
          border-radius: var(--card-radius);
          pointer-events: none;
          z-index: 10;
        }

        .icon-header-3d {
          margin-bottom: 1.5rem;
          transform: translateZ(35px);
        }

        .icon-box-3d {
          width: 68px;
          height: 68px;
          border-radius: 18px;
          background: rgba(101, 169, 46, 0.12);
          border: 1px solid rgba(101, 169, 46, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(101, 169, 46, 0.2);
        }

        .school-card-body {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          transform-style: preserve-3d;
        }

        .school-card-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.8rem;
          transform: translateZ(25px);
        }

        .school-card-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.65;
          margin-bottom: 2rem;
          flex-grow: 1;
          transform: translateZ(15px);
        }

        .card-cta-btn {
          width: 100%;
          justify-content: space-between;
          padding: 0.85rem 1.4rem;
          font-size: 0.95rem;
          transform: translateZ(30px);
        }

        /* Inquiry Form */
        .inquiry-container {
          padding: 3.5rem 3rem;
          max-width: 900px;
          margin: 0 auto;
          border-radius: var(--card-radius);
        }

        .inquiry-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .inquiry-header h2 {
          margin-bottom: 0.5rem;
        }

        .school-form .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .form-group input, .form-group select, .form-group textarea {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          padding: 0.8rem 1rem;
          color: #fff;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: var(--accent-green);
          background: rgba(255, 255, 255, 0.12);
        }

        .form-group select option {
          background: #012b7d;
          color: #fff;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          font-size: 1.05rem;
          gap: 0.6rem;
        }

        .success-message {
          text-align: center;
          padding: 3rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .success-message h3 {
          font-size: 1.8rem;
          color: #fff;
        }

        .error-box {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid #EF4444;
          color: #FCA5A5;
          padding: 0.8rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        /* How It Works Section */
        .how-it-works-section {
          max-width: 1240px;
          margin: 4rem auto 5rem;
          padding: 0 1.5rem;
          text-align: center;
        }

        .section-eyebrow {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--accent-green);
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 0.6rem;
        }

        .section-title {
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.8rem;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 620px;
          margin: 0 auto 3.5rem;
          line-height: 1.6;
        }

        .process-grid-3steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
        }

        .process-step-card {
          position: relative;
          flex: 1;
          border-radius: 24px;
          padding: 2.5rem 2rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
          text-align: center;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .process-step-card:hover {
          transform: translateY(-6px);
          border-color: rgba(101, 169, 46, 0.5);
        }

        .step-badge {
          position: absolute;
          top: 1.2rem;
          right: 1.5rem;
          font-size: 1.8rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.12);
        }

        .step-icon-box {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: rgba(101, 169, 46, 0.15);
          border: 1px solid rgba(101, 169, 46, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }

        .step-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.8rem;
        }

        .step-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .step-connector-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.6;
        }

        /* CTA Banner Section */
        .schools-cta-section {
          max-width: 1240px;
          margin: 4rem auto 5rem;
          padding: 0 1.5rem;
        }

        .cta-card {
          position: relative;
          border-radius: 32px;
          padding: 4rem 3rem;
          text-align: center;
          background: linear-gradient(135deg, rgba(0, 85, 185, 0.25) 0%, rgba(101, 169, 46, 0.2) 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
          overflow: hidden;
        }

        .cta-tag {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--accent-green);
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 0.8rem;
        }

        .cta-title {
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .cta-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 620px;
          margin: 0 auto 2.2rem;
          line-height: 1.6;
        }

        .cta-btn {
          padding: 1rem 2.5rem;
          border-radius: 999px;
          font-weight: 800;
          font-size: 1.05rem;
          box-shadow: 0 10px 30px rgba(101, 169, 46, 0.4);
        }

        @media (max-width: 992px) {
          .process-grid-3steps {
            flex-direction: column;
            gap: 1.5rem;
          }
          .step-connector-arrow {
            transform: rotate(90deg);
          }
        }

        @media (max-width: 768px) {
          .school-form .form-grid {
            grid-template-columns: 1fr;
          }
          .inquiry-container {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
