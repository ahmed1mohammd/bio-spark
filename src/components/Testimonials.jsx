import React from 'react';
import { FaStar } from 'react-icons/fa';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Amanda Peterson",
      role: "Head of Science, Cambridge Academy",
      image: "/main.png",
    },
    {
      id: 2,
      name: "Mark Harrison",
      role: "Principal, Newton High",
      image: "/main.png",
    },
    {
      id: 3,
      name: "Dr. Sarah Jenkins",
      role: "Biology Teacher, Pioneer STEM",
      image: "/main.png",
    }
  ];

  return (
    <div className="section" style={{ paddingTop: '5rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Voices of Bio Spark</h2>
        <p style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 4rem' }}>
          Hear what educators and administrators have to say about the Bio Spark experience.
        </p>

        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div key={t.id} className="testimonial-card">
              <div className="client-image-container">
                <img src={t.image} alt={t.name} className="client-image-16-9" />
              </div>
              
              <div className="client-info-section">
                <div className="client-info">
                  <h4 className="client-name">{t.name}</h4>
                  <span className="client-role">{t.role}</span>
                </div>
                
                <div className="stars-container">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="glowing-star" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }

        .testimonial-card {
           background: rgba(10, 25, 50, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .testimonial-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 20px;
          padding: 2px;
          background: linear-gradient(135deg, rgba(40, 167, 69, 0.4), rgba(0, 139, 240, 0.1), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 50px rgba(40, 167, 69, 0.15);
        }

        .testimonial-card:hover::before {
          opacity: 1;
        }

        .client-image-container {
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-radius: 12px;
          margin-bottom: 1.5rem;
        }

        .client-image-16-9 {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .testimonial-card:hover .client-image-16-9 {
          transform: scale(1.05);
        }

        .client-info-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.5rem;
        }

        .client-info {
          display: flex;
          flex-direction: column;
        }

        .client-name {
          color: white;
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 0 0.3rem 0;
        }

        .client-role {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .stars-container {
          display: flex;
          gap: 0.3rem;
        }

        .glowing-star {
          color: #ffc107;
          font-size: 1.2rem;
          filter: drop-shadow(0 0 8px rgba(255, 193, 7, 0.6));
        }

        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
