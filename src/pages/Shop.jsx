import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, CheckCircle2, Tag } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { fetchProducts } from '../services/api';
import Card3D from '../components/Card3D';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetchProducts({ active: true });
        if (res?.data?.data) {
          setProducts(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="shop-page">
      <section className="page-header">
        <div className="section">
          <h1>Educational Kits & 3D Models</h1>
          <p>
            Explore 3D DNA models, molecular cell puzzles, home extraction kits, and official BioSpark STEM merchandise.
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <section className="section filter-section">
        <div className="category-pills">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="section products-grid-section">
        {loading ? (
          <div className="loading-box glass-panel"><p>Loading Bio Shop products...</p></div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid-cards products-grid">
            {filteredProducts.map((product) => (
              <Card3D key={product._id} className="product-card">
                <div className="card-media">
                  <img src={product.imageUrl || '/main.png'} alt={product.title} onError={(e) => { e.target.src = '/main.png'; }} />
                  <span className="category-tag">{product.category}</span>
                </div>
                <div className="card-content">
                  <h3>{product.title}</h3>
                  <p>{product.shortDescription || product.description?.substring(0, 100) + '...'}</p>

                  <div className="price-row">
                    <div className="pricing">
                      <span className="price">${product.price}</span>
                      {product.salePrice > 0 && <span className="sale-price">${product.salePrice}</span>}
                    </div>
                    <span className={`stock-status ${product.stockStatus === 'In Stock' ? 'in-stock' : ''}`}>
                      {product.stockStatus || 'In Stock'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem' }}>
                    <a 
                      href={`https://wa.me/201140866774?text=${encodeURIComponent(`Hello BioSpark, I want to order/inquire about the product: ${product.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary card-btn"
                      style={{ justifyContent: 'center' }}
                    >
                      <FaWhatsapp size={16} style={{ marginRight: '6px' }} />
                      <span>Order on WhatsApp</span>
                    </a>

                    <Link to={`/shop/${product.slug || product._id}`} style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        ) : (
          <div className="empty-box glass-panel">
            <h3>No products found in this category.</h3>
            <p>Please check back soon for new educational releases.</p>
          </div>
        )}
      </section>

      <style>{`
        .shop-page {
          padding-top: 6rem;
        }

        .page-header {
          text-align: center;
          padding: 4rem 0 2rem;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          background: rgba(115, 197, 42, 0.15);
          border: 1px solid rgba(115, 197, 42, 0.3);
          border-radius: 9999px;
          color: #73C52A;
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }

        .page-header h1 {
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          margin-bottom: 1rem;
          color: #fff;
        }

        .page-header p {
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.1rem;
          color: #CBD5E1;
        }

        .category-pills {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .pill-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #E2E8F0;
          padding: 0.6rem 1.4rem;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .pill-btn.active, .pill-btn:hover {
          background: #73C52A;
          color: #000;
          border-color: #73C52A;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1280px;
          margin: 0 auto;
        }

        .product-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border-radius: 24px;
          background: rgba(0, 20, 50, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: all 0.4s ease;
        }

        .product-card:hover {
          border-color: rgba(101, 169, 46, 0.4);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45), 0 0 25px rgba(101, 169, 46, 0.25);
          transform: translateY(-8px);
        }

        .card-media {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(0, 20, 50, 0.6) 0%, rgba(5, 40, 80, 0.4) 100%);
        }

        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .card-media img {
          transform: scale(1.08);
        }

        .category-tag {
          position: absolute;
          top: 14px; right: 14px;
          background: linear-gradient(135deg, var(--accent-green), #84c233);
          color: #000000;
          font-weight: 800;
          font-size: 0.78rem;
          padding: 6px 14px;
          border-radius: 999px;
          box-shadow: 0 4px 15px rgba(101, 169, 46, 0.4);
        }

        .card-content {
          padding: 1.8rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-content h3 {
          font-size: 1.35rem;
          color: #ffffff;
          font-weight: 700;
          margin-bottom: 0.8rem;
          line-height: 1.3;
        }

        .card-content p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          line-height: 1.65;
          flex-grow: 1;
        }

        .price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-top: 1.1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .pricing {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .price {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--accent-green);
        }

        .sale-price {
          font-size: 0.95rem;
          color: var(--text-secondary);
          text-decoration: line-through;
          opacity: 0.7;
        }

        .stock-status {
          font-size: 0.82rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #F59E0B;
        }

        .stock-status.in-stock {
          background: rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.3);
          color: #10B981;
        }

        .card-btn {
          width: 100%;
          justify-content: center;
          padding: 0.85rem 1.4rem;
          font-size: 0.98rem;
          font-weight: 700;
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}
