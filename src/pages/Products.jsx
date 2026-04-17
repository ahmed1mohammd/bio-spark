import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', '3D Product', 'Edutainment', 'Puzzles'];

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          title: "3D Human Heart Model",
          category: "3D Product",
          description: "A highly detailed and interactive 3D model of the human heart, perfect for exploring cardiovascular anatomy and function.",
          image: "https://i.ibb.co/tpt9hvQf/Whats-App-Image-2026-04-16-at-11-48-52-PM.jpg"
        },
        {
          id: 2,
          title: "3D Plant Cell",
          category: "3D Product",
          description: "Immersive 3D model showcasing the intricate structure, organelles, and functions of a plant cell.",
          image: "https://i.ibb.co/SW9wvPD/Whats-App-Image-2026-04-17-at-4-28-16-PM.jpg"
        },
        {
          id: 3,
          title: "3D Animal Cell",
          category: "3D Product",
          description: "Interactive 3D visualization of animal cell components, providing a hands-on approach to cellular biology.",
          image: "https://i.ibb.co/V0xykhsW/Whats-App-Image-2026-04-17-at-4-13-53-PM.jpg"
        },
        {
          id: 4,
          title: "DNA-Shaped Pencil Case",
          category: "3D Product",
          description: "A unique and functional 3D-printed pencil case designed as a DNA double helix, perfect for organizing your stationery with a scientific flair.",
          image: "https://i.ibb.co/8DzL48Hq/Whats-App-Image-2026-04-17-at-3-14-55-PM.jpg"
        },
        {
          id: 5,
          title: "Pins",
          category: "Edutainment",
          description: "Stylish, biology-themed pins merging education with fun accessories.",
          image: "https://i.ibb.co/kR6JV0j/Whats-App-Image-2026-04-17-at-3-36-01-PM-1.jpg"
        },
        {
          id: 6,
          title: "Pins",
          category: "Edutainment",
          description: "Educational pin set featuring molecular and cellular designs.",
          image: "https://i.ibb.co/Xkj03B8F/Whats-App-Image-2026-04-17-at-3-36-00-PM.jpg"
        },
        {
          id: 7,
          title: "Creative Bio Pins",
          category: "Edutainment",
          description: "High-quality, uniquely designed pins that celebrate the wonders of biology, perfect for customizing your backpacks and lab coats.",
          image: "https://i.ibb.co/7NYLMvJT/Whats-App-Image-2026-04-17-at-11-20-02-PM.jpg"
        },
        {
          id: 8,
          title: "Human body anatomy",
          category: "Puzzles",
          description: "Challenging puzzle to learn and explore human body anatomy interactively.",
          image: "https://i.ibb.co/w1wfwT0/Whats-App-Image-2026-04-17-at-3-52-51-PM.jpg"
        }
      ]);
      setLoading(false);
    }, 600);
  }, []);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      <div className="section" style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: '80vh' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Explore Our Programs</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 2rem' }}>
          Discover our full-scale science packages designed to deliver unforgettable, immersive educational experiences for your entire school.
        </p>

        {/* Tab Filter */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.8rem 1.5rem',
                borderRadius: '30px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: activeCategory === cat ? 'linear-gradient(135deg, #28a745, #218838)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            Loading products...
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="glass-panel interactive" style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '24px',
              }}>
                <div style={{ height: '280px', width: '100%', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.9rem', color: '#65a92e', marginBottom: '0.5rem', fontWeight: 'bold' }}>{product.category}</div>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'white' }}>{product.title}</h3>
                  <p style={{ fontSize: '1.05rem', flex: 1, color: 'var(--text-secondary)', lineHeight: '1.7' }}>{product.description}</p>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                    <a href={`https://wa.me/201140866774?text=Hello, I am interested in ${product.title}`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-primary"
                      style={{
                        flex: '1 1 auto',
                        padding: '0.8rem',
                        fontSize: '1.05rem',
                        gap: '0.6rem',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #28a745, #218838)',
                        border: 'none',
                        boxShadow: '0 4px 15px rgba(40, 167, 69, 0.4)'
                      }}>
                      <FaWhatsapp size={20} /> Book Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          max-width: 1280px;
          margin: 0 auto;
        }
        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }
        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </>
  );
}
