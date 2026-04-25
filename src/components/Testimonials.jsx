import React, { useState, useEffect, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { fetchData, API_ENDPOINTS } from '../utils/api';

export default function Testimonials() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const startDrag = (x) => {
    setIsDragging(true);
    setStartX(x - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  const onDrag = (x) => {
    if (!isDragging || !scrollRef.current) return;
    const xPos = x - (scrollRef.current.offsetLeft || 0);
    const walk = (xPos - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const getReviews = async () => {
      try {
        const result = await fetchData(API_ENDPOINTS.REVIEWS);
        // Duplicate items to create a seamless infinite scroll effect
        const data = result?.data || [];
        if (data.length > 0) {
          // We duplicate only once (total 2x) to allow the infinite scroll loop
          // to work smoothly without showing too many repetitions.
          setTestimonials([...data, ...data]);
        }
      } catch (err) {
        console.error('Failed to load testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, []);

  // Auto-scroll loop
  useEffect(() => {
    if (isDragging || testimonials.length === 0) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
           scrollRef.current.scrollLeft = 0;
        }
      }
    }, 20);
    return () => clearInterval(interval);
  }, [isDragging, testimonials]);

  return (
    <div className="section" style={{ paddingTop: '5rem', paddingBottom: '6rem', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <h2 className="entry-fade-in" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Our Customers</h2>
        <p className="entry-fade-in" style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 4rem', animationDelay: '0.2s' }}>
           Hear what educators and administrators have to say about the Bio Spark experience.
        </p>

        <div 
          className={`marquee-wrapper entry-scale-in ${isDragging ? 'dragging' : ''}`} 
          style={{ animationDelay: '0.4s' }}
          ref={scrollRef}
          onMouseDown={(e) => startDrag(e.pageX)}
          onMouseLeave={endDrag}
          onMouseUp={endDrag}
          onMouseMove={(e) => { e.preventDefault(); onDrag(e.pageX); }}
          onTouchStart={(e) => startDrag(e.touches[0].pageX)}
          onTouchEnd={endDrag}
          onTouchCancel={endDrag}
          onTouchMove={(e) => onDrag(e.touches[0].pageX)}
        >
          <div className="marquee-track">
            {testimonials.map((t, idx) => (
              <div key={`${t._id}-${idx}`} className="testimonial-card marquee-item">
                <div className="client-image-container">
                  <img src={t.imageUrl} alt="Experience Showcase" className="client-image-display" />
                </div>
              
              <div className="client-info-section" style={{ justifyContent: 'center' }}>
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
      </div>

      <style>{`
        /* Marquee Styles */
        .marquee-wrapper {
          width: 100%;
          overflow-x: hidden;
          position: relative;
          padding: 1rem 0;
          cursor: grab;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .marquee-wrapper.dragging {
          cursor: grabbing;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          gap: 2.5rem;
        }

        .marquee-item {
          width: 320px;
          flex-shrink: 0;
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
          user-select: none;
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
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 50px rgba(40, 167, 69, 0.15);
          z-index: 5;
        }

        .testimonial-card:hover::before {
          opacity: 1;
        }

        .client-image-container {
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .client-image-display {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
          pointer-events: none;
          user-select: none;
        }

        .testimonial-card:hover .client-image-display {
          transform: scale(1.05);
        }

        .client-info-section {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.5rem 0;
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

        /* Entry Animations inspired by Hero */
        .entry-fade-in {
          opacity: 0;
          animation: fadeInUpC 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .entry-scale-in {
          opacity: 0;
          animation: scaleInC 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInUpC {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleInC {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 768px) {
          .marquee-item {
            width: 260px;
          }
        }
      `}</style>
    </div>
  );
}
