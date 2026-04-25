import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaFacebookF, FaLinkedinIn, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-grid">

          {/* Column 1: Brand */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo" onClick={() => window.scrollTo(0, 0)}>
              <span>Bio</span>Spark
            </Link>
            <p className="footer-desc">
              Transforming traditional science education through immersive, high-tech biological and chemical modules. We bring the laboratory to your classroom.
            </p>
            <div className="social-links">
              <a href="#https://www.facebook.com/share/1CSaTSwNqG/" aria-label="Facebook" className="social-btn" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://www.instagram.com/bio_spark01/" aria-label="Instagram" className="social-btn" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://www.tiktok.com/@biospark2?is_from_webapp=1&sender_device=pc" aria-label="TikTok" className="social-btn" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="footer-col">
            <h4 className="col-title">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/products" onClick={() => window.scrollTo(0, 0)}>Our Packages</Link></li>
              <li><Link to="/experiments" onClick={() => window.scrollTo(0, 0)}>Individual Experiments</Link></li>
              <li><Link to="/events" onClick={() => window.scrollTo(0, 0)}>Events& Shows</Link></li>
              <li><Link to="/articles" onClick={() => window.scrollTo(0, 0)}>Articles & News</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="footer-col">
            <h4 className="col-title">Company</h4>
            <ul className="footer-links">
              <li><a href="/#about">About Us</a></li>
              <li><a href="/#mission-vision">Mission & Vision</a></li>
              <li><a href="/#board">Our Team</a></li>

            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col">
            <h4 className="col-title">Contact Us</h4>
            <ul className="contact-info">
              <li><FaMapMarkerAlt className="icon" /> Cairo, Egypt</li>
              <li><FaPhoneAlt className="icon" /> +20 11 40866774</li>
              <li><FaEnvelope className="icon" /> biospark225@gmail.com</li>
            </ul>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="bottom-content">
          <p>&copy; {new Date().getFullYear()} Bio Spark. All Rights Reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          /* Darkest gradient (#002b77 -> #003787) */
          background: linear-gradient(to bottom, #002b77 0%, #003787 100%);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          z-index: 10;
          margin-top: 5rem;
        }

        .footer-top {
          max-width: 1280px;
          margin: 0 auto;
          padding: 5rem 2rem 3rem 2rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
        }

        .footer-logo {
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 1.5rem;
          letter-spacing: -0.5px;
        }
        .footer-logo span {
          color: var(--accent-cyan);
        }

        .footer-desc {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 2.5rem;
          max-width: 380px;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1rem;
        }
        .social-btn:hover {
          background: var(--accent-cyan);
          border-color: var(--accent-cyan);
          transform: translateY(-4px);
          box-shadow: 0 6px 15px rgba(76, 214, 255, 0.25);
        }

        .col-title {
          color: white;
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 2rem;
          position: relative;
          padding-bottom: 0.6rem;
        }
        .col-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 40px;
          height: 2px;
          background: var(--accent-cyan);
          border-radius: 2px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .footer-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 1rem;
          transition: all 0.3s ease;
          display: inline-flex;
          position: relative;
        }
        .footer-links a:hover {
          color: var(--accent-cyan);
          transform: translateX(6px);
        }

        .contact-info {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .contact-info li {
          color: var(--text-secondary);
          font-size: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          line-height: 1.4;
        }
        
        .contact-info .icon {
          color: var(--accent-cyan);
          margin-top: 0.25rem;
          flex-shrink: 0;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(0, 0, 0, 0.2);
        }

        .bottom-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .bottom-content p {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.9rem;
          margin: 0;
        }

        .legal-links {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .legal-links a {
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s ease;
        }
        .legal-links a:hover {
          color: white;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            row-gap: 4rem;
          }
          .brand-col {
            grid-column: 1 / -1;
          }
          .footer-desc {
            max-width: 600px;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .footer-top {
            padding: 4rem 1.5rem 2rem;
          }
          .bottom-content {
            flex-direction: column;
            text-align: center;
            justify-content: center;
          }
          .legal-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
