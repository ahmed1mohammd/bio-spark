import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, CheckCircle2, ArrowLeft, Send, Package, Tag } from 'lucide-react';
import { fetchProductBySlug } from '../services/api';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetchProductBySlug(slug);
        if (res?.data?.data) {
          setProduct(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (loading) return <div className="section" style={{ paddingTop: '8rem', textAlign: 'center' }}><p>Loading product details...</p></div>;
  if (!product) return <div className="section" style={{ paddingTop: '8rem', textAlign: 'center' }}><h2>Product Not Found</h2><Link to="/shop" className="btn-primary">Back to Bio Shop</Link></div>;

  return (
    <div className="product-detail-page">
      <section className="section detail-container">
        <Link to="/shop" className="back-link"><ArrowLeft size={18} /><span>Back to All Products</span></Link>

        <div className="detail-grid">
          <div className="media-box glass-panel">
            <img src={product.imageUrl || '/main.png'} alt={product.title} onError={(e) => { e.target.src = '/main.png'; }} />
          </div>

          <div className="product-info glass-panel">
            <div className="category-badge">{product.category}</div>
            <h1>{product.title}</h1>
            <div className="price-tag">${product.price}</div>

            <p className="description">{product.description}</p>

            {product.specifications?.length > 0 && (
              <div className="specs-box">
                <h3>Product Specifications</h3>
                <ul>
                  {product.specifications.map((spec, i) => (
                    <li key={i}>
                      <strong>{spec.key}:</strong> <span>{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="cta-box">
              <a 
                href={`https://wa.me/201140866774?text=${encodeURIComponent(`Hello BioSpark, I would like to order/inquire about: ${product.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary cta-btn"
              >
                <Send size={18} />
                <span>Order via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .product-detail-page { padding-top: 6rem; padding-bottom: 4rem; }
        .back-link { display: inline-flex; align-items: center; gap: 0.5rem; color: #73C52A; text-decoration: none; font-weight: 600; margin-bottom: 2rem; }
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: flex-start; }
        .media-box { height: 420px; padding: 1.5rem; display: flex; align-items: center; justify-content: center; }
        .media-box img { max-width: 100%; max-height: 380px; object-fit: contain; }
        .product-info { padding: 2.5rem; }
        .category-badge { display: inline-block; background: #73C52A; color: #000; font-weight: 700; font-size: 0.85rem; padding: 0.3rem 0.8rem; border-radius: 9999px; margin-bottom: 1rem; }
        .product-info h1 { font-size: 2.2rem; color: #fff; margin-bottom: 1rem; }
        .price-tag { font-size: 2rem; font-weight: 800; color: #73C52A; margin-bottom: 1.5rem; }
        .description { color: #CBD5E1; line-height: 1.7; font-size: 1.05rem; margin-bottom: 2rem; }
        .specs-box { margin-bottom: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); }
        .specs-box h3 { color: #fff; font-size: 1.2rem; margin-bottom: 1rem; }
        .specs-box ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; }
        .specs-box li { color: #CBD5E1; font-size: 0.95rem; }
        .specs-box strong { color: #fff; }
        .cta-btn { width: 100%; justify-content: center; padding: 1rem; font-size: 1.1rem; gap: 0.6rem; }
        @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
