import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { fetchData, API_ENDPOINTS } from '../utils/api';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const result = await fetchData(API_ENDPOINTS.ARTICLES);
        setArticles(result?.data || []);
      } catch (err) {
        console.error('Failed to load articles:', err);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);

  const scrollToArticle = (e) => {
    e.preventDefault();
    document.getElementById('main-article').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="articles-page">
      {/* Hero Section */}
      <div className="articles-hero-bg">
        <div className="section hero-section articles-hero">
          <div className="hero-content">
            <h1>Transforming How Biotechnology is Learned</h1>
            <p className="subtext">
              BioSpark delivers engaging, real-world learning experiences that simplify complex biology and connect it to practical applications.
            </p>
            <p className="additional-text">
              Empowering students with future-ready biotech skills through interactive content, 3D models, and hands-on learning.
            </p>
            <a href="#main-article" onClick={scrollToArticle} className="btn-primary scroll-btn">
              Learn More <ArrowDown size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Introductory Article (Static) */}
      <div className="article-entry-bg" id="main-article" style={{
        background: 'radial-gradient(circle at 10% 50%, rgba(5, 100, 194, 0.4) 0%, transparent 60%), linear-gradient(180deg, #0564c2 0%, #004391 100%)'
      }}>
        <div className="section article-section">
          <div className="glass-panel reading-panel entry-fade-in">
            <h2 className="article-title">BioSpark: Transforming Biotechnology Education for the Future</h2>
            
            <div className="article-content">
              <p>
                BioSpark is an innovative edtech platform transforming how biotechnology is learned. Instead of relying on traditional memorization-based methods, BioSpark focuses on delivering engaging, real-world learning experiences that simplify complex biological concepts and connect them directly to practical applications.
              </p>
              
              <p>
                In today’s rapidly evolving world, biotechnology is no longer just an academic subject—it is a critical field shaping the future of medicine, agriculture, and environmental sustainability. However, many students struggle to fully understand its concepts due to the abstract and theoretical nature of traditional teaching methods. BioSpark addresses this gap by turning complex ideas into clear, visual, and interactive experiences.
              </p>

              <p>
                Through a combination of interactive content and hands-on approaches, BioSpark empowers students to actively engage with science rather than passively consume information. This approach helps learners develop deeper understanding, critical thinking skills, and real-world awareness—key competencies required in the modern biotech landscape.
              </p>

              <h3 style={{ color: 'white', fontSize: '1.4rem', margin: '3rem 0 1.5rem 0' }}>One of the core strengths of BioSpark lies in its diverse and innovative product ecosystem:</h3>

              <div className="bullet-point">
                <h4>Interactive Biotech Content</h4>
                <p>BioSpark offers short, engaging videos and explainers designed to break down complex biotechnology topics into simple, easy-to-understand concepts. These bite-sized learning materials make it easier for students to grasp difficult ideas quickly and effectively.</p>
              </div>

              <div className="bullet-point">
                <h4>3D Learning Models & Visualizations</h4>
                <p>Using immersive 3D models, BioSpark allows students to explore biological structures and processes in a highly visual and interactive way. This transforms abstract concepts into tangible experiences, making learning more intuitive and memorable.</p>
              </div>

              <div className="bullet-point">
                <h4>Hands-on Learning Kits</h4>
                <p>To bridge the gap between theory and practice, BioSpark provides hands-on kits that enable students to perform real experiments. These activities bring biology to life and encourage curiosity, experimentation, and discovery.</p>
              </div>

              <div className="bullet-point">
                <h4>Workshops & Training Programs</h4>
                <p>BioSpark conducts live workshops and training sessions tailored for students, schools, and educational institutions. These sessions combine explanation, demonstration, and interaction to create impactful learning experiences.</p>
              </div>

              <div className="bullet-point">
                <h4>Digital Learning Platform (BioSpark Hub)</h4>
                <p>The BioSpark Hub serves as a centralized digital platform where students can access structured biotechnology content, track their learning progress, and explore advanced topics in an organized way.</p>
              </div>

              <p style={{ marginTop: '2.5rem' }}>
                By integrating these solutions, BioSpark creates a complete learning ecosystem that supports students at every stage of their educational journey—from foundational understanding to advanced exploration.
              </p>

              <p>
                Aligned with Egypt’s vision for innovation and digital transformation, BioSpark is committed to inspiring the next generation of scientists, innovators, and problem-solvers. By making biotechnology accessible, engaging, and relevant, BioSpark is helping build a future driven by knowledge, creativity, and scientific advancement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Articles List */}
      <div className="articles-list">
        {loading ? (
          <div className="section" style={{ textAlign: 'center', padding: '5rem' }}>
            <div className="loader" style={{ margin: '0 auto 1.5rem' }}></div>
            <p style={{ color: 'var(--text-secondary)' }}>Loading more articles...</p>
          </div>
        ) : (
          articles.map((article, index) => (
            <div key={article._id} className="article-entry-bg" id={`article-${article._id}`} style={{
              background: index % 2 !== 0 ? 
                'radial-gradient(circle at 10% 50%, rgba(5, 100, 194, 0.4) 0%, transparent 60%), linear-gradient(180deg, #0564c2 0%, #004391 100%)' :
                'radial-gradient(circle at 90% 80%, rgba(101, 169, 46, 0.2) 0%, transparent 70%), linear-gradient(135deg, #004391 0%, #002b77 100%)'
            }}>
              <div className="section article-section">
                <div className="glass-panel reading-panel entry-fade-in">
                  
                  {article.imageUrl && (
                    <div className="article-image-main">
                      <img src={article.imageUrl} alt={article.title} />
                      <div className="image-caption">News & Updates</div>
                    </div>
                  )}

                  <h2 className="article-title">{article.title}</h2>
                  
                  <div className="article-content" style={{ whiteSpace: 'pre-wrap' }}>
                    {article.description}
                  </div>

                  {article.registrationLink && (
                    <div className="article-cta" style={{ marginTop: '3rem', textAlign: 'center' }}>
                      <a href={article.registrationLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                        Follow Up <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        /* --- Backgrounds --- */
        .articles-page {
          overflow-x: hidden;
        }
        
        .articles-hero-bg {
          background: 
            radial-gradient(circle at 80% 20%, rgba(0, 139, 240, 0.4) 0%, transparent 60%),
            linear-gradient(135deg, #012b7d 0%, #0564c2 100%);
          position: relative;
        }

        .article-entry-bg {
          position: relative;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* --- Article Section --- */
        .article-section {
          padding-top: 6rem;
          padding-bottom: 8rem;
          max-width: 1000px;
        }

        .reading-panel {
          padding: 4rem 5rem;
          background: rgba(0, 15, 40, 0.45);
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        .article-image-main {
          width: calc(100% + 10rem);
          margin-left: -5rem;
          margin-top: -4rem;
          margin-bottom: 4rem;
          border-radius: 40px 40px 0 0;
          overflow: hidden;
          position: relative;
          height: 450px;
        }

        .article-image-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-caption {
          position: absolute;
          bottom: 1.5rem;
          right: 2rem;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          color: white;
          padding: 0.5rem 1.2rem;
          border-radius: 99px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .article-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          text-align: left;
          margin-bottom: 2.5rem;
          line-height: 1.25;
          color: white;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .article-content {
          color: var(--text-secondary);
          font-size: 1.2rem;
          line-height: 1.8;
          text-align: left;
        }

        .article-content p {
          margin-bottom: 1.5rem;
        }

        .bullet-point {
          margin-bottom: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-left: 4px solid var(--accent-green);
          padding: 1.5rem;
          border-radius: 0 12px 12px 0;
        }

        .bullet-point h4 {
          color: white;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .bullet-point p {
          margin: 0 !important;
          font-size: 1.05rem;
        }

        /* --- Global Loader --- */
        .loader {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(255,255,255,0.1);
          border-top-color: var(--accent-green);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Responsive Adjustments */
        @media (max-width: 900px) {
          .reading-panel {
            padding: 3rem 2rem;
            border-radius: 20px;
          }
          .article-image-main {
            width: calc(100% + 4rem);
            margin-left: -2rem;
            margin-top: -3rem;
            height: 300px;
          }
          .article-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </div>
  );
}
