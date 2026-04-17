import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function Articles() {
  const scrollToArticle = (e) => {
    e.preventDefault();
    document.getElementById('main-article').scrollIntoView({ behavior: 'smooth' });
  };

  const moreArticles = [
    {
      id: 1,
      title: "The Role of 3D Models in Science Education",
      desc: "How visualizing abstract structures changes the way students grasp complex biological mechanisms.",
      img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 2,
      title: "Preparing Students for Biotech Careers",
      desc: "Why early exposure to practical biotechnology paves the way for innovation in medical fields.",
      img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      title: "Empowering Educators with Hands-on Kits",
      desc: "Bringing theoretical classes to life through out-of-the-box laboratory experiments.",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
    }
  ];

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

      {/* Main Article Section */}
      <div className="articles-main-bg" id="main-article">
        <div className="section article-section">
          <div className="glass-panel reading-panel">
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

              <h3>One of the core strengths of BioSpark lies in its diverse and innovative product ecosystem:</h3>

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

      {/* Articles Grid Section */}
      <div className="articles-grid-bg">
        <div className="section">
          <h2 className="grid-section-title">More Articles & News</h2>
          <div className="grid-cards articles-grid">
            {moreArticles.map(article => (
              <div key={article.id} className="glass-panel interactive article-card">
                <div className="card-image-wrapper">
                  <img src={article.img} alt={article.title} />
                  <div className="card-image-overlay"></div>
                </div>
                <div className="card-content">
                  <h4 className="card-title">{article.title}</h4>
                  <p className="card-desc">{article.desc}</p>
                  <a href="#" className="read-more-link" onClick={e => e.preventDefault()}>
                    Read More <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
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
        
        .articles-main-bg {
          background: 
            radial-gradient(circle at 10% 50%, rgba(5, 100, 194, 0.4) 0%, transparent 60%),
            linear-gradient(180deg, #0564c2 0%, #004391 100%);
        }

        .articles-grid-bg {
          background: 
            radial-gradient(circle at 90% 80%, rgba(101, 169, 46, 0.2) 0%, transparent 70%),
            linear-gradient(135deg, #004391 0%, #002b77 100%);
        }

        /* --- Hero Section --- */
        .articles-hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-top: 8rem;
        }

        .hero-content {
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-content h1 {
          font-size: clamp(3rem, 6vw, 4.5rem);
          color: white;
          margin-bottom: 2rem;
          line-height: 1.1;
          text-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        .hero-content .subtext {
          font-size: 1.3rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          line-height: 1.6;
          max-width: 800px;
        }

        .hero-content .additional-text {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 3rem;
          line-height: 1.5;
          max-width: 750px;
        }

        .scroll-btn {
          gap: 0.6rem;
          padding: 0.9rem 2rem;
          font-size: 1.1rem;
        }

        /* --- Main Article Section --- */
        .article-section {
          padding-top: 4rem;
          padding-bottom: 6rem;
          max-width: 1000px;
        }

        .reading-panel {
          padding: 4rem 5rem;
          background: rgba(0, 15, 40, 0.45);
        }

        .article-title {
          font-size: clamp(2rem, 4vw, 2.8rem);
          text-align: left;
          margin-bottom: 3rem;
          line-height: 1.25;
          color: white;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 1.5rem;
        }

        .article-content {
          color: var(--text-secondary);
          font-size: 1.15rem;
          line-height: 1.8;
          text-align: left;
        }

        .article-content p {
          margin-bottom: 1.5rem;
          font-size: 1.15rem;
          color: var(--text-secondary);
        }

        .article-content h3 {
          color: white;
          font-size: 1.4rem;
          margin: 3rem 0 1.5rem 0;
          line-height: 1.4;
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
          margin: 0;
          font-size: 1.05rem;
        }

        /* --- Grid Section --- */
        .grid-section-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3.5rem;
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2.5rem;
        }

        .article-card {
          padding: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .card-image-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .article-card:hover img {
          transform: scale(1.05);
        }

        .card-image-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to top, rgba(0, 20, 50, 0.5) 0%, transparent 100%);
        }

        .card-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-title {
          color: white;
          font-size: 1.35rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .card-desc {
          font-size: 1rem;
          margin-bottom: 2rem;
          flex: 1;
        }

        .read-more-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--light-blue);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .read-more-link:hover {
          color: white;
        }
        
        .read-more-link svg {
          transition: transform 0.3s ease;
        }
        
        .read-more-link:hover svg {
          transform: translateX(4px);
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .reading-panel {
            padding: 2.5rem 1.5rem;
          }
          .article-title {
            font-size: 2rem;
          }
          .bullet-point {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
