import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import About from '../components/About';
import MissionVision from '../components/MissionVision';
import WhyChooseUs from '../components/WhyChooseUs';
import Products from '../components/Products';
import BoardMembers from '../components/BoardMembers';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Card3D from '../components/Card3D';
import GallerySection from '../components/GallerySection';
import { Building2, Users, Award, ChevronRight, X, FlaskConical, Dna, Box, GraduationCap, Send, BookOpen, Sliders, Truck } from 'lucide-react';
import { fetchPrograms, fetchSiteContent } from '../services/api';

export default function Home() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetchPrograms({ active: true, featured: true })
      .then(res => { if (res?.data?.data) setPrograms(res.data.data); })
      .catch(() => {});
  }, []);

  const whoCards = [
    {
      id: 'schools',
      title: 'Schools & Institutions',
      description: 'Educational programs designed for schools seeking hands-on bio labs and mobile experiment setups.',
      ctaText: 'For Schools',
      ctaLink: '/for-schools',
      icon: <Building2 size={36} color="#73C52A" />
    },
    {
      id: 'parents',
      title: 'Parents & Students',
      description: 'Hands-on educational experiences, summer camps, and STEM kits that make science engaging.',
      ctaText: 'Explore Camps',
      ctaLink: '/camps',
      icon: <Users size={36} color="#73C52A" />
    },
    {
      id: 'organizations',
      title: 'Organizations & STEM Centers',
      description: 'Customized scientific education programs and exhibitions for institutions and science events.',
      ctaText: 'Contact Us',
      ctaLink: '/contact',
      icon: <Award size={36} color="#73C52A" />
    }
  ];

  const steps = [
    {
      stepNumber: '01',
      icon: <BookOpen size={28} color="var(--accent-green)" />,
      title: 'Select Program',
      description: 'Browse our school workshops, mobile lab sessions, summer camps, or custom curricula offerings.'
    },
    {
      stepNumber: '02',
      icon: <Send size={28} color="var(--light-blue)" />,
      title: 'Submit Inquiry',
      description: 'Share your school details, target student grade levels, estimated count, and preferred dates.'
    },
    {
      stepNumber: '03',
      icon: <Sliders size={28} color="var(--accent-green)" />,
      title: 'Customize Experience',
      description: 'Our scientific team tailors experiment kits and theory modules specifically for your curriculum.'
    },
    {
      stepNumber: '04',
      icon: <Truck size={28} color="var(--light-blue)" />,
      title: 'Live Lab Day',
      description: 'BioSpark arrives at your campus fully equipped with mobile lab gear, safety kits, and expert instructors.'
    }
  ];

  return (
    <>
      {/* 1. ORIGINAL HERO */}
      <section id="home"><Hero /></section>

      {/* 3. WHO IS BIOSPARK FOR? */}
      <section className="section who-section">
        <div className="who-header">
          <h5 className="who-tag">Target Audience</h5>
          <h2 className="who-title">Who is BioSpark for?</h2>
          <p className="who-subtitle">
            Tailored STEM and biotechnology experiences designed for every learner, institution, and organization.
          </p>
        </div>
        <div className="grid-cards audience-grid">
          {whoCards.map((card) => (
            <Card3D key={card.id} className="audience-card">
              <div className="audience-icon-wrapper">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <Link to={card.ctaLink} className="card-link">
                <span>{card.ctaText}</span>
                <ChevronRight size={16} />
              </Link>
            </Card3D>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PROGRAMS (NEW REQUIREMENT) */}
      {programs.length > 0 && (
        <section className="section programs-section">
          <h2>Featured Programs</h2>
          <div className="grid-cards programs-grid">
            {programs.map((prog) => (
              <Card3D key={prog._id} className="program-card">
                <div className="program-media">
                  <img src={prog.imageUrl || '/main.png'} alt={prog.title} onError={(e) => { e.target.src = '/main.png'; }} />
                  <span className="program-badge">{prog.category}</span>
                </div>
                <div className="program-body">
                  <h3>{prog.title}</h3>
                  <p>{prog.shortDescription}</p>
                  <Link to="/for-schools" className="btn-primary btn-sm">Inquire for School</Link>
                </div>
              </Card3D>
            ))}
          </div>
        </section>
      )}

      {/* 5. ORIGINAL ABOUT */}
      <section id="about"><About /></section>

      {/* 6. ORIGINAL MISSION & VISION */}
      <section id="mission-vision"><MissionVision /></section>

      {/* 7. ORIGINAL WHY CHOOSE US */}
      <section id="why-choose-us"><WhyChooseUs /></section>

      {/* 8. HOW IT WORKS REDESIGN */}
      <section className="section how-section">
        <div className="how-header">
          <span className="how-tag">SIMPLE 4-STEP PROCESS</span>
          <h2 className="how-title">How BioSpark Works</h2>
          <p className="how-subtitle">
            From program selection to live hands-on experiments, bringing biotechnology to your campus is effortless and exciting.
          </p>
        </div>

        <div className="how-steps-wrapper">
          {/* Connection Line on Desktop */}
          <div className="how-process-line"></div>

          <div className="steps-grid">
            {steps.map((step, idx) => (
              <Card3D key={idx} className="how-step-card">
                <div className="step-top-bar">
                  <div className="step-icon-box">{step.icon}</div>
                  <span className="step-number-pill">{step.stepNumber}</span>
                </div>
                <h4 className="step-card-title">{step.title}</h4>
                <p className="step-card-desc">{step.description}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ORIGINAL PRODUCTS */}
      <section id="products"><Products /></section>

      {/* 11. ORIGINAL TESTIMONIALS */}
      <section id="testimonials"><Testimonials /></section>

      {/* 12. ORIGINAL BOARD MEMBERS */}
      <section id="board"><BoardMembers /></section>

      {/* 13. BRING BIOSPARK TO YOUR SCHOOL CTA BANNER */}
      <section className="section cta-banner-section">
        <div className="glass-panel cta-banner-box">
          <h2>Bring BioSpark to Your School</h2>
          <p>Transform science education in your classroom with our mobile biotechnology laboratories and specialized workshops.</p>
          <Link to="/for-schools" className="btn-primary btn-lg">Request School Program</Link>
        </div>
      </section>

      {/* 14. ORIGINAL CONTACT SECTION */}
      <Contact />

      <style>{`
        .who-section {
          padding-top: 5rem;
          padding-bottom: 5rem;
          text-align: center;
          position: relative;
        }
        .who-header {
          max-width: 700px;
          margin: 0 auto 3.5rem;
          text-align: center;
        }
        .who-tag {
          color: var(--accent-green);
          font-size: 0.85rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 0.8rem;
          font-weight: 800;
        }
        .who-title {
          font-size: clamp(2.2rem, 3.5vw, 2.8rem);
          margin-bottom: 1rem;
          color: #ffffff;
        }
        .who-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0 auto;
        }
        .audience-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1150px;
          margin: 0 auto;
          justify-content: center;
          align-items: stretch;
        }
        .audience-card {
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: 100%;
          border-radius: 24px;
          background: rgba(0, 20, 50, 0.4);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
        }
        .audience-card:hover {
          transform: translateY(-8px);
          border-color: rgba(115, 197, 42, 0.4);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 25px rgba(115, 197, 42, 0.2);
        }
        .audience-icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          background: rgba(115, 197, 42, 0.15);
          border: 1px solid rgba(115, 197, 42, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.8rem;
          box-shadow: 0 0 20px rgba(115, 197, 42, 0.15);
          transition: all 0.3s ease;
        }
        .audience-card:hover .audience-icon-wrapper {
          transform: scale(1.1);
          background: rgba(115, 197, 42, 0.25);
          box-shadow: 0 0 25px rgba(115, 197, 42, 0.35);
        }
        .audience-card h3 {
          font-size: 1.45rem;
          margin-bottom: 0.9rem;
          color: #ffffff;
          font-weight: 700;
          text-align: center;
        }
        .audience-card p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 0.98rem;
          line-height: 1.65;
          text-align: center;
          flex-grow: 1;
        }
        .card-link {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.6rem;
          background: rgba(115, 197, 42, 0.15);
          border: 1px solid rgba(115, 197, 42, 0.35);
          border-radius: 999px;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .card-link:hover {
          background: #73C52A;
          color: #000000;
          border-color: #73C52A;
          box-shadow: 0 8px 20px rgba(115, 197, 42, 0.4);
          transform: translateY(-2px);
          gap: 0.75rem;
        }
        @media (max-width: 992px) {
          .audience-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
          }
        }
        .program-card { overflow: hidden; padding: 0; display: flex; flex-direction: column; }
        .program-media { position: relative; height: 200px; overflow: hidden; }
        .program-media img { width: 100%; height: 100%; object-fit: cover; }
        .program-badge { position: absolute; top: 1rem; right: 1rem; background: #73C52A; color: #000; font-weight: 700; font-size: 0.75rem; padding: 0.3rem 0.8rem; border-radius: 9999px; }
        .program-body { padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1; }
        .program-body h3 { font-size: 1.25rem; color: #fff; margin-bottom: 0.5rem; }
        .program-body p { color: #94A3B8; font-size: 0.9rem; margin-bottom: 1.5rem; flex-grow: 1; }
        .btn-sm { padding: 0.5rem 1.2rem; font-size: 0.85rem; align-self: flex-start; }

        /* HOW IT WORKS SECTION REDESIGN */
        .how-section {
          padding-top: 6rem;
          padding-bottom: 6rem;
          position: relative;
          text-align: center;
        }

        .how-header {
          max-width: 750px;
          margin: 0 auto 4rem;
          text-align: center;
        }

        .how-tag {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 2px;
          color: var(--accent-green);
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 0.8rem;
        }

        .how-title {
          font-size: clamp(2.2rem, 3.8vw, 3rem);
          color: #ffffff;
          margin-bottom: 1.2rem;
          font-weight: 800;
        }

        .how-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0 auto;
        }

        .how-steps-wrapper {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
        }

        .how-process-line {
          position: absolute;
          top: 48px;
          left: 10%;
          right: 10%;
          height: 3px;
          background: linear-gradient(90deg, var(--accent-green), var(--light-blue), var(--accent-green));
          z-index: 0;
          opacity: 0.4;
          box-shadow: 0 0 12px rgba(101, 169, 46, 0.4);
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.8rem;
          position: relative;
          z-index: 1;
        }

        .how-step-card {
          padding: 2.2rem 1.8rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          height: 100%;
          border-radius: 24px;
          background: rgba(0, 20, 50, 0.4);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .how-step-card:hover {
          transform: translateY(-8px);
          border-color: rgba(101, 169, 46, 0.4);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 25px rgba(101, 169, 46, 0.2);
        }

        .step-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 1.8rem;
          position: relative;
          z-index: 2;
        }

        .step-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .how-step-card:hover .step-icon-box {
          background: rgba(101, 169, 46, 0.2);
          border-color: var(--accent-green);
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(101, 169, 46, 0.3);
        }

        .step-number-pill {
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          letter-spacing: 1px;
        }

        .how-step-card:hover .step-number-pill {
          background: var(--accent-green);
          color: #000000;
          border-color: var(--accent-green);
        }

        .step-card-title {
          font-size: 1.3rem;
          color: #ffffff;
          margin-bottom: 0.8rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .step-card-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.65;
          margin: 0;
          flex-grow: 1;
        }

        @media (max-width: 1024px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .how-process-line {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .steps-grid {
            grid-template-columns: 1fr;
          }
          .how-step-card {
            padding: 1.8rem 1.4rem;
          }
        }
        .gallery-tabs { display: flex; justify-content: center; gap: 0.8rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .tab-btn { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); color: #fff; padding: 0.5rem 1.2rem; border-radius: 9999px; cursor: pointer; font-weight: 600; transition: all 0.3s; }
        .tab-btn.active, .tab-btn:hover { background: #73C52A; color: #000; border-color: #73C52A; }
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }
        .gallery-item { position: relative; height: 220px; overflow: hidden; cursor: pointer; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .gallery-item:hover img { transform: scale(1.1); }
        .gallery-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 1.2rem; opacity: 0; transition: opacity 0.3s; }
        .gallery-item:hover .gallery-overlay { opacity: 1; }
        .gallery-overlay h4 { color: #fff; font-size: 1rem; }
        .gallery-overlay p { color: #CBD5E1; font-size: 0.8rem; }
        .lightbox-modal { position: fixed; inset: 0; z-index: 2000; background: rgba(0, 0, 0, 0.85); display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .lightbox-content { max-width: 800px; width: 100%; position: relative; padding: 1.5rem; overflow: hidden; }
        .lightbox-content img { width: 100%; max-height: 500px; object-fit: contain; border-radius: 12px; margin-bottom: 1rem; }
        .close-btn { position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.6); border: none; color: #fff; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .cta-banner-box { padding: 4rem 2rem; text-align: center; max-width: 900px; margin: 0 auto; background: linear-gradient(135deg, rgba(5, 100, 194, 0.4) 0%, rgba(115, 197, 42, 0.2) 100%); }
        .cta-banner-box h2 { margin-bottom: 1rem; }
        .cta-banner-box p { font-size: 1.1rem; color: #E2E8F0; margin-bottom: 2rem; }
        .btn-lg { padding: 1rem 2.5rem; font-size: 1.1rem; }
      `}</style>
    </>
  );
}
