import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={() => window.scrollTo(0, 0)}>
            <img src="https://i.ibb.co/HTxXpcTM/logo.png" alt="Bio Spark Logo" style={{ height: '48px', width: 'auto', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5)) drop-shadow(0 0 15px rgba(255,255,255,0.6))' }} />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/for-schools" className={`nav-link ${location.pathname === '/for-schools' ? 'active' : ''}`}>For Schools</Link>
            <Link to="/workshops" className={`nav-link ${location.pathname === '/workshops' ? 'active' : ''}`}>Workshops</Link>
            <Link to="/camps" className={`nav-link ${location.pathname === '/camps' ? 'active' : ''}`}>Camps</Link>
            <Link to="/shop" className={`nav-link ${location.pathname === '/shop' || location.pathname === '/products' ? 'active' : ''}`}>Shop</Link>
            
            {/* Desktop Dropdown */}
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="nav-link dropdown-btn">
                Explore <FaChevronDown size={10} className={`chevron ${dropdownOpen ? 'open' : ''}`} />
              </button>
              
              <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
                <Link to="/events" className={`drop-link ${location.pathname === '/events' ? 'active' : ''}`}>Events</Link>
                <Link to="/articles" className={`drop-link ${location.pathname === '/articles' ? 'active' : ''}`}>Articles & News</Link>
              </div>
            </div>

            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            
            <a href="https://wa.me/201140866774" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginLeft: '0.8rem', padding: '0.6rem 1.4rem' }}>
              Get Started
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button 
            className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-items">
          <Link to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/for-schools" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>For Schools</Link>
          <Link to="/workshops" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Workshops</Link>
          <Link to="/camps" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Camps</Link>
          <Link to="/shop" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
          
          <div className="mobile-dropdown">
            <button 
              className="mobile-link dropdown-btn" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              Explore <FaChevronDown size={14} className={`chevron ${dropdownOpen ? 'open' : ''}`} />
            </button>
            <div className={`mobile-dropdown-content ${dropdownOpen ? 'show' : ''}`}>
              <Link to="/events" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>Events</Link>
              <Link to="/articles" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>Articles & News</Link>
            </div>
          </div>

          <Link to="/about" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/contact" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          
          <a href="https://wa.me/201140866774" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '2rem', width: '100%', padding: '1rem', fontSize: '1.2rem', textAlign: 'center' }} onClick={() => setMobileMenuOpen(false)}>
            Get Started
          </a>
        </div>
      </div>

      <style>{`
        /* Core Navbar Styles */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          padding: 1rem 0;
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-bottom: 1px solid rgba(255,255,255,0.3);
        }
        
        .navbar.scrolled {
          padding: 0.6rem 0;
          background: rgba(255, 255, 255, 0.75);
          box-shadow: 0 4px 30px rgba(0,0,0,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.5);
        }

        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          text-decoration: none;
          z-index: 1001;
          display: flex;
          align-items: center;
        }

        /* Desktop Nav */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.8rem;
        }

        .nav-link {
          color: #333;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--accent-green);
        }

        /* Dropdown Desktop */
        .nav-dropdown {
          position: relative;
          padding: 0.5rem 0;
        }
        
        .dropdown-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0;
        }
        
        .chevron {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .chevron.open {
          transform: rotate(180deg);
        }

        .dropdown-content {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(15px);
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 12px;
          padding: 0.5rem;
          min-width: 180px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          pointer-events: none;
        }
        .dropdown-content.show {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }

        .drop-link {
          display: block;
          padding: 0.8rem 1.2rem;
          color: #444;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .drop-link:hover, .drop-link.active {
          background: rgba(0,0,0,0.05);
          color: var(--accent-green);
          transform: translateX(4px);
        }

        /* Mobile Hamburger */
        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          width: 32px;
          height: 24px;
          position: relative;
          z-index: 1001;
          padding: 0;
        }
        .hamburger-btn span {
          position: absolute;
          width: 100%;
          height: 2px;
          background: #333;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          left: 0;
        }
        .hamburger-btn span:nth-child(1) { top: 0; }
        .hamburger-btn span:nth-child(2) { top: 11px; }
        .hamburger-btn span:nth-child(3) { top: 22px; }

        .hamburger-btn.open span:nth-child(1) {
          transform: rotate(45deg);
          top: 11px;
        }
        .hamburger-btn.open span:nth-child(2) {
          opacity: 0;
          transform: scale(0.5);
        }
        .hamburger-btn.open span:nth-child(3) {
          transform: rotate(-45deg);
          top: 11px;
        }

        /* Mobile Overlay */
        .mobile-menu {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0, 15, 36, 0.98);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-menu.open {
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav-items {
          display: flex;
          flex-direction: column;
          width: 85%;
          max-width: 400px;
          gap: 0.5rem;
          transform: translateY(30px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
        }
        .mobile-menu.open .mobile-nav-items {
          transform: translateY(0);
          opacity: 1;
          transition-delay: 0.1s;
        }

        .mobile-link {
          color: white;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 700;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: block;
          text-align: left;
          background: none;
          border: none;
          font-family: inherit;
          cursor: pointer;
          transition: color 0.3s;
        }
        .mobile-link:hover {
          color: var(--accent-cyan);
        }

        .mobile-dropdown-content {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-dropdown-content.show {
          max-height: 300px;
        }
        
        .mobile-sublink {
          display: block;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 1.2rem;
          padding: 1rem 1.5rem;
          border-left: 2px solid transparent;
          margin: 0.5rem 0 0.5rem 1.5rem;
          background: rgba(255,255,255,0.03);
          border-radius: 0 8px 8px 0;
          transition: all 0.3s ease;
        }
        .mobile-sublink:hover, .mobile-sublink.active {
          border-left: 2px solid var(--accent-cyan);
          color: white;
          background: rgba(255,255,255,0.08);
          transform: translateX(4px);
        }

        @media (max-width: 900px) {
          .desktop-nav { display: none; }
          .hamburger-btn { display: block; }
          .nav-container { padding: 0 1.5rem; }
        }
      `}</style>
    </>
  );
}
