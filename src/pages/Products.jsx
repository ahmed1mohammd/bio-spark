import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { fetchData, API_ENDPOINTS } from '../utils/api';

const DEFAULT_PRODUCTS = [
  {
    _id: '1',
    title: '3D DNA Double Helix Model',
    category: '3D Product',
    description: 'Precision 3D printed double helix structure with color-coded nitrogenous bases (A, T, C, G).',
    imageUrl: '/main.png',
    price: '$45'
  },
  {
    _id: '2',
    title: 'Cellular Biology Puzzle Set',
    category: 'Puzzles',
    description: 'Interactive organelle assembly puzzle designed for intuitive understanding of eukaryotic cell anatomy.',
    imageUrl: '/herosec.png',
    price: '$35'
  },
  {
    _id: '3',
    title: 'Edutainment Science Discovery Kit',
    category: 'Edutainment',
    description: 'Comprehensive experiment kit featuring safe reagents, micro-tubes, and guided lab protocols.',
    imageUrl: '/spark_character.png',
    price: '$55'
  }
];

export default function ProductsPage() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', '3D Product', 'Edutainment', 'Puzzles'];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await fetchData(API_ENDPOINTS.PRODUCTS);
        if (result?.data && result.data.length > 0) {
          setProducts(result.data);
        }
      } catch (err) {
        console.error('Products fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
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
              <div key={product._id} className="glass-panel interactive" style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '24px',
              }}>
                <div style={{ height: '280px', width: '100%', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.5s ease' }}
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
