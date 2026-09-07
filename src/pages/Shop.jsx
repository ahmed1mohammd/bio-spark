import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, CheckCircle2, Tag, Search, Sparkles, ShieldCheck, Truck, Award, MessageSquare, ArrowRight, Dna, FlaskConical } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { fetchProducts } from '../services/api';
import Card3D from '../components/Card3D';

const DEFAULT_PRODUCTS = [
  {
    _id: '1',
    title: '3D DNA Double Helix Model',
    category: '3D Models',
    shortDescription: 'Precision 3D printed double helix structure with color-coded nitrogenous bases (A, T, C, G).',
    description: 'Precision 3D printed double helix structure with color-coded nitrogenous bases (A, T, C, G) for classroom demonstrations.',
    imageUrl: '/main.png',
    price: 45,
    badge: 'Best Seller',
    stockStatus: 'In Stock',
    specs: ['3D Printed', 'Color-Coded Bases', 'Classroom Ready']
  },
  {
    _id: '2',
    title: 'Cellular Organelle Puzzle Set',
    category: 'Puzzles',
    shortDescription: 'Interactive organelle assembly puzzle designed for intuitive understanding of cell anatomy.',
    description: 'Interactive organelle assembly puzzle designed for intuitive understanding of eukaryotic plant and animal cell anatomy.',
    imageUrl: '/herosec.png',
    price: 35,
    badge: 'Popular',
    stockStatus: 'In Stock',
    specs: ['Tactile Assembly', 'Plant & Animal Cells', 'Middle & High School']
  },
  {
    _id: '3',
    title: 'Edutainment Science Discovery Kit',
    category: 'Kits',
    shortDescription: 'Comprehensive experiment kit featuring safe reagents, micro-tubes, and guided lab protocols.',
    description: 'Comprehensive home & school experiment kit featuring safe reagents, micro-tubes, and guided lab protocols.',
    imageUrl: '/spark_character.png',
    price: 55,
    badge: 'Hands-on',
    stockStatus: 'In Stock',
    specs: ['Safe Non-Toxic Reagents', 'Guided Manual', 'All Ages']
  },
  {
    _id: '4',
    title: 'Portable Gel Electrophoresis Chamber',
    category: 'Lab Equipment',
    shortDescription: 'Compact, safe low-voltage gel chamber with LED blue-light transilluminator for real-time DNA band viewing.',
    description: 'Compact, safe low-voltage gel chamber with LED blue-light transilluminator for real-time DNA band viewing in classrooms.',
    imageUrl: '/About.png',
    price: 120,
    badge: 'Lab Spec',
    stockStatus: 'In Stock',
    specs: ['LED Blue-Light', 'Safe Low-Voltage', 'Real-time Band Viewing']
  },
  {
    _id: '5',
    title: 'Microbiology Slide Set (50 Specimen)',
    category: 'Kits',
    shortDescription: 'Pre-mounted high-clarity optical glass slides covering plant tissues, human cells, bacteria, and protozoa.',
    description: 'Pre-mounted high-clarity optical glass slides covering plant tissues, human cells, bacteria, and protozoa.',
    imageUrl: '/spark_character.png',
    price: 30,
    badge: '50 Slides',
    stockStatus: 'In Stock',
    specs: ['Optical Glass', 'Prepared Samples', 'Storage Box Included']
  },
  {
    _id: '6',
    title: 'CRISPR Gene Editing Interactive Model',
    category: '3D Models',
    shortDescription: 'Physical magnetic molecular model demonstrating Cas9 protein binding and target DNA sequence cleavage.',
    description: 'Physical magnetic molecular model demonstrating Cas9 protein binding and target DNA sequence cleavage.',
    imageUrl: '/herosec.png',
    price: 65,
    badge: 'Advanced',
    stockStatus: 'In Stock',
    specs: ['Magnetic Snap Assembly', 'Cas9 & gRNA Included', 'Advanced Genetics']
  }
];

export default function Shop() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['All', '3D Models', 'Kits', 'Puzzles', 'Lab Equipment'];

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetchProducts({ active: true });
        if (res?.data?.data && res.data.data.length > 0) {
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

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="shop-page">
      {/* 1. HERO SHOP BANNER */}
      <section className="shop-hero-section">
        <div className="shop-hero-container">
          <div className="shop-hero-badge">
            <Sparkles size={16} color="var(--accent-green)" />
            <span>BIOSPARK OFFICIAL STORE</span>
          </div>

          <h1 className="shop-hero-title">
            Bring Science <span className="gradient-text">To Your Hands</span>
          </h1>

          <p className="shop-hero-subtitle">
            High-precision 3D biological models, interactive cell puzzles, and certified STEM experiment kits designed for school labs and home discovery.
          </p>

          {/* Features Bar */}
          <div className="shop-features-bar">
            <div className="feature-item">
              <Truck size={20} color="var(--accent-green)" />
              <span>Fast Delivery Across Egypt</span>
            </div>
            <div className="feature-divider"></div>
            <div className="feature-item">
              <ShieldCheck size={20} color="var(--accent-green)" />
              <span>100% Certified Safe & Non-Toxic</span>
            </div>
            <div className="feature-divider"></div>
            <div className="feature-item">
              <Award size={20} color="var(--accent-green)" />
              <span>Curriculum-Aligned STEM Kits</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH BAR */}
      <section className="shop-controls-section">
        <div className="controls-container">
          {/* Search Box */}
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search 3D models, kits, puzzles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Filter Pills */}
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
        </div>
      </section>

      {/* 3. PRODUCTS GRID */}
      <section className="section shop-grid-section">
        <div className="container">
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <Card3D key={product._id} className="product-card">
                  {/* Card Media Header */}
                  <div className="card-media">
                    <img 
                      src={product.imageUrl || '/main.png'} 
                      alt={product.title} 
                      onError={(e) => { e.target.src = '/main.png'; }} 
                    />
                    {product.badge && (
                      <span className="card-badge">{product.badge}</span>
                    )}
                    <span className="category-tag">{product.category || 'STEM Kit'}</span>
                  </div>

                  {/* Card Content Body */}
                  <div className="card-content">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-desc">{product.shortDescription || product.description}</p>

                    {/* Specs / Features Pills */}
                    {product.specs && (
                      <div className="product-specs">
                        {product.specs.map((spec, i) => (
                          <span key={i} className="spec-pill">
                            <CheckCircle2 size={12} color="var(--accent-green)" />
                            <span>{spec}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price & Stock Row */}
                    <div className="price-row">
                      <div className="pricing">
                        <span className="price">{product.price}</span>
                        <span className="currency" style={{ marginLeft: '4px', fontSize: '0.9rem', fontWeight: '800', color: 'var(--accent-green)' }}>EGP</span>
                        {product.salePrice > 0 && <span className="sale-price" style={{ marginLeft: '8px' }}>{product.salePrice} EGP</span>}
                      </div>
                      <span className="stock-status in-stock">
                        {product.stockStatus || 'In Stock'}
                      </span>
                    </div>

                    {/* CTA Action Buttons */}
                    <div className="card-actions">
                      <a 
                        href={`https://wa.me/201140866774?text=${encodeURIComponent(`Hello BioSpark, I would like to order: ${product.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="product-btn-green"
                      >
                        <FaWhatsapp size={18} />
                        <span>Order on WhatsApp</span>
                      </a>

                      <Link to={`/shop/${product.slug || product._id}`} className="view-details-link">
                        <span>View Specs</span>
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </Card3D>
              ))}
            </div>
          ) : (
            <div className="empty-box glass-panel">
              <ShoppingBag size={48} color="var(--text-secondary)" />
              <h3>No products match your search.</h3>
              <p>Try searching with another keyword or select a different category.</p>
              <button 
                className="btn-primary" 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                style={{ marginTop: '1rem' }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. SCHOOL BULK ORDERS CTA BANNER */}
      <section className="section shop-cta-section">
        <div className="container">
          <div className="shop-cta-card glass-panel">
            <div className="cta-content">
              <span className="cta-tag">FOR SCHOOLS & STEM INSTITUTIONS</span>
              <h2>Need Custom Quantities or School Lab Packages?</h2>
              <p>We supply complete classroom sets, custom 3D printed organelle models, and school lab experiment bundles with dedicated educator support.</p>
            </div>

            <a 
              href="https://wa.me/201140866774?text=Hello%20BioSpark,%20I'm%20interested%20in%20custom%20bulk%20orders%20for%20our%20school." 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary cta-btn"
            >
              <MessageSquare size={18} />
              <span>Inquire for Schools</span>
            </a>
          </div>
        </div>
      </section>

      {/* STYLED JSX */}
      <style>{`
        .shop-page {
          padding-top: 5.5rem;
          padding-bottom: 6rem;
          min-height: 100vh;
          background: 
            radial-gradient(circle at 85% 15%, rgba(115, 197, 42, 0.12) 0%, transparent 55%),
            radial-gradient(circle at 15% 85%, rgba(0, 139, 240, 0.15) 0%, transparent 60%),
            linear-gradient(135deg, #011b4e 0%, #003270 100%);
          background-attachment: fixed;
          color: #ffffff;
        }

        /* 1. Hero Section */
        .shop-hero-section {
          padding: 4.5rem 1.5rem 2.5rem;
          text-align: center;
        }

        .shop-hero-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .shop-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.45rem 1.3rem;
          background: rgba(115, 197, 42, 0.14);
          border: 1px solid rgba(115, 197, 42, 0.35);
          border-radius: 99px;
          color: var(--accent-green);
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          margin-bottom: 1.5rem;
        }

        .shop-hero-title {
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 1.2rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #73C52A 0%, #4CD6FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .shop-hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 720px;
          margin: 0 auto 3rem;
        }

        /* Features Bar */
        .shop-features-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          padding: 1.2rem 2rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          max-width: 850px;
          margin: 0 auto;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #E2E8F0;
        }

        .feature-divider {
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.15);
        }

        /* 2. Controls & Search */
        .shop-controls-section {
          max-width: 1240px;
          margin: 0 auto 3.5rem;
          padding: 0 1.5rem;
        }

        .controls-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.8rem;
        }

        .search-input-wrapper {
          position: relative;
          width: 100%;
          max-width: 520px;
        }

        .search-icon {
          position: absolute;
          left: 1.2rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94A3B8;
        }

        .search-input {
          width: 100%;
          padding: 0.9rem 1.2rem 0.9rem 3rem;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          font-size: 0.98rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-green);
          box-shadow: 0 0 20px rgba(115, 197, 42, 0.25);
        }

        .category-pills {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .pill-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #CBD5E1;
          padding: 0.65rem 1.6rem;
          border-radius: 99px;
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pill-btn.active, .pill-btn:hover {
          background: var(--accent-green);
          color: #000000;
          border-color: var(--accent-green);
          box-shadow: 0 6px 18px rgba(115, 197, 42, 0.35);
        }

        /* 3. Products Grid */
        .shop-grid-section {
          max-width: 1240px;
          margin: 0 auto 5rem;
          padding: 0 1.5rem;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.2rem;
        }

        .product-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border-radius: 28px;
          background: rgba(0, 22, 50, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
        }

        .product-card:hover {
          transform: translateY(-10px);
          border-color: rgba(115, 197, 42, 0.4);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), 0 0 35px rgba(115, 197, 42, 0.25);
        }

        .card-media {
          position: relative;
          height: 230px;
          overflow: hidden;
          background: #001229;
        }

        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .product-card:hover .card-media img {
          transform: scale(1.08);
        }

        .card-badge {
          position: absolute;
          top: 1.2rem;
          left: 1.2rem;
          z-index: 3;
          background: rgba(115, 197, 42, 0.9);
          color: #000000;
          font-weight: 800;
          font-size: 0.75rem;
          padding: 0.35rem 0.85rem;
          border-radius: 99px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .category-tag {
          position: absolute;
          top: 1.2rem;
          right: 1.2rem;
          z-index: 3;
          background: rgba(4, 28, 62, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.78rem;
          padding: 0.35rem 0.85rem;
          border-radius: 99px;
        }

        .card-content {
          padding: 1.8rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .product-title {
          font-size: 1.4rem;
          color: #ffffff;
          font-weight: 700;
          margin-bottom: 0.6rem;
          line-height: 1.3;
        }

        .product-desc {
          color: var(--text-secondary);
          font-size: 0.94rem;
          margin-bottom: 1.2rem;
          line-height: 1.6;
          flex-grow: 1;
        }

        .product-specs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .spec-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.75rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #CBD5E1;
          font-size: 0.8rem;
          font-weight: 600;
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
          gap: 0.2rem;
        }

        .currency {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--accent-green);
        }

        .price {
          font-size: 1.8rem;
          font-weight: 800;
          color: #ffffff;
        }

        .sale-price {
          font-size: 0.95rem;
          color: var(--text-secondary);
          text-decoration: line-through;
          margin-left: 0.4rem;
          opacity: 0.7;
        }

        .stock-status.in-stock {
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.3rem 0.8rem;
          border-radius: 99px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10B981;
        }

        .card-actions {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .product-btn-green {
          width: 100%;
          justify-content: center;
          padding: 0.85rem 1.4rem;
          font-size: 0.95rem;
          font-weight: 700;
          gap: 0.6rem;
          border-radius: 14px;
          background: linear-gradient(135deg, #65a92e 0%, #448e2b 100%);
          color: #ffffff;
          border: 1px solid rgba(115, 197, 42, 0.4);
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(101, 169, 46, 0.3);
        }

        .product-btn-green:hover {
          background: linear-gradient(135deg, #73C52A 0%, #65a92e 100%);
          box-shadow: 0 10px 28px rgba(115, 197, 42, 0.5);
          transform: translateY(-2px);
          color: #ffffff;
        }

        .view-details-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .view-details-link:hover {
          color: #ffffff;
        }

        .empty-box {
          text-align: center;
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        /* 4. CTA Section */
        .shop-cta-section {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .shop-cta-card {
          border-radius: 32px;
          padding: 3.5rem 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
          background: linear-gradient(135deg, rgba(0, 139, 240, 0.2) 0%, rgba(115, 197, 42, 0.15) 100%);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .cta-tag {
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--accent-green);
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 0.6rem;
        }

        .cta-content h2 {
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 800;
          margin-bottom: 0.8rem;
        }

        .cta-content p {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.6;
          max-width: 650px;
        }

        .cta-btn {
          padding: 1rem 2.2rem;
          font-size: 1rem;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          border-radius: 99px;
        }

        @media (max-width: 1024px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          .shop-cta-card { flex-direction: column; text-align: center; padding: 3rem 2rem; }
        }

        @media (max-width: 640px) {
          .products-grid { grid-template-columns: 1fr; }
          .feature-divider { display: none; }
          .shop-features-bar { flex-direction: column; gap: 1rem; text-align: center; }
        }
      `}</style>
    </div>
  );
}
