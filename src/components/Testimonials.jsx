import React, { useRef, useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

export default function Testimonials() {
  const baseTestimonials = [
    {
      id: 1,
      image: "https://i.ibb.co/XZNhSFR8/IMG-8386.jpg",
    },
    {
      id: 2,
      image: "https://i.ibb.co/h1B5gckv/20260305-145533-jpg.jpg",
    },
    {
      id: 3,
      image: "https://i.ibb.co/YFZGtcmx/Whats-App-Image-2026-04-18-at-2-00-13-AM.jpg",
    },
    {
      id: 4,
      image: "https://i.ibb.co/8hRQVFq/Whats-App-Image-2026-04-18-at-1-53-10-AM.jpg",
    },
    {
      id: 5,
      image: "https://i.ibb.co/XkrbwL0T/de4e52b5-3c5f-4d9e-9734-1834c0ae69e8.jpg",
    },
    {
      id: 6,
      image: "https://i.ibb.co/gFBJh7VY/20260305-150138-jpg.jpg",
    },
    {
      id: 7,
      image: "https://i.ibb.co/LhYR8LV5/Whats-App-Image-2026-04-18-at-1-53-05-AM.jpg",
    },
    {
      id: 8,
      image: "https://i.ibb.co/twqBCFJW/660c0256-bead-4a4a-b17f-9f3605c172bd.jpg",
    },
    {
      id: 9,
      image: "https://i.ibb.co/qLDJH6jW/da8635d6-4d84-4561-8055-1ade8325cace.jpg",
    },
    {
      id: 10,
      image: "https://i.ibb.co/60gPK2GZ/0749e3c7-590e-42ab-a45d-c5b158b4b865.jpg",
    }
  ];

  /* Duplicate items exactly twice to create two identical halves for perfect math on scroll loop */
  const testimonials = [...baseTestimonials, ...baseTestimonials, ...baseTestimonials, ...baseTestimonials, ...baseTestimonials, ...baseTestimonials, ...baseTestimonials, ...baseTestimonials];

  const trackRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId;
    const speed = 0.3; // Very slow speed

    const autoScroll = () => {
      // Auto scroll only if not dragging and not hovered
      if (!isDown && !isHovered) {
        track.scrollLeft += speed;
        // If we scrolled past exactly half the total width (the first copy), seamlessly jump back to 0
        // We use scrollWidth / 2 assuming the track contains two perfectly identical halves (which it does via duplication)
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        } else if (track.scrollLeft <= 0) {
          // If dragged to the left edge, jump to middle
          track.scrollLeft = track.scrollWidth / 2;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, [isDown, isHovered]);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="section" style={{ paddingTop: '5rem', paddingBottom: '6rem', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <h2 className="entry-fade-in" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Our Customers</h2>
        <p className="entry-fade-in" style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 4rem', animationDelay: '0.2s' }}>
           Hear what educators and administrators have to say about the Bio Spark experience.
        </p>

        <div className="marquee-wrapper entry-scale-in" style={{ animationDelay: '0.4s' }}>
          <div 
            className="marquee-track"
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
          >
          {testimonials.map((t, idx) => (
            <div key={`${t.id}-${idx}`} className="testimonial-card marquee-item">
              <div className="client-image-container">
                <img src={t.image} alt="Experience Showcase" className="client-image-display" />
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
          position: relative;
          padding: 1rem 0;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .marquee-track {
          display: flex;
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          gap: 2.5rem;
          /* Hide scrollbar */
          scrollbar-width: none;
          -ms-overflow-style: none;
          cursor: grab;
        }

        .marquee-track::-webkit-scrollbar {
          display: none;
        }

        .marquee-track:active {
          cursor: grabbing;
        }

        .marquee-item {
          width: 320px;
          flex-shrink: 0;
          /* Protect from pointer events bug when dragging out of bounds */
          user-select: none;
        }
        
        .client-image-display {
          pointer-events: none; /* Prevents dragging the image file instead of scrolling */
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
