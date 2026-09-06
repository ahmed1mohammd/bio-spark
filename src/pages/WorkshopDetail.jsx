import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, GraduationCap, CheckCircle2, ArrowLeft, Send } from 'lucide-react';
import { fetchWorkshopBySlug } from '../services/api';

export default function WorkshopDetail() {
  const { slug } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkshop() {
      try {
        const res = await fetchWorkshopBySlug(slug);
        if (res?.data?.data) {
          setWorkshop(res.data.data);
        }
      } catch (err) {
        console.error('Error loading workshop details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadWorkshop();
  }, [slug]);

  if (loading) {
    return (
      <div className="section" style={{ paddingTop: '8rem', textAlign: 'center' }}>
        <p>Loading workshop details...</p>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="section" style={{ paddingTop: '8rem', textAlign: 'center' }}>
        <h2>Workshop Not Found</h2>
        <p>The requested workshop could not be found.</p>
        <Link to="/workshops" className="btn-primary" style={{ marginTop: '1rem' }}>Back to Workshops</Link>
      </div>
    );
  }

  return (
    <div className="workshop-detail-page">
      <section className="section detail-container">
        <Link to="/workshops" className="back-link">
          <ArrowLeft size={18} />
          <span>Back to All Workshops</span>
        </Link>

        <div className="detail-grid">
          <div className="detail-main">
            <div className="category-badge">{workshop.category}</div>
            <h1>{workshop.title}</h1>
            <p className="short-desc">{workshop.shortDescription}</p>

            <div className="media-hero glass-panel">
              <img src={workshop.imageUrl || '/main.png'} alt={workshop.title} onError={(e) => { e.target.src = '/main.png'; }} />
            </div>

            <div className="glass-panel detail-box">
              <h2>Full Workshop Overview</h2>
              <p className="full-desc">{workshop.fullDescription || workshop.shortDescription}</p>

              {workshop.learningObjectives?.length > 0 && (
                <div className="section-block">
                  <h3>Learning Objectives</h3>
                  <ul className="check-list">
                    {workshop.learningObjectives.map((obj, i) => (
                      <li key={i}>
                        <CheckCircle2 size={18} color="#73C52A" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.activities?.length > 0 && (
                <div className="section-block">
                  <h3>Hands-on Lab Activities</h3>
                  <ul className="check-list">
                    {workshop.activities.map((act, i) => (
                      <li key={i}>
                        <CheckCircle2 size={18} color="#73C52A" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="detail-sidebar">
            <div className="glass-panel sidebar-card">
              <h3>Workshop Details</h3>
              <div className="sidebar-meta">
                <div className="meta-row">
                  <GraduationCap size={20} color="#73C52A" />
                  <div>
                    <strong>Target Age Group</strong>
                    <p>{workshop.ageGroup || 'Grades 6 - 12'}</p>
                  </div>
                </div>

                <div className="meta-row">
                  <Clock size={20} color="#73C52A" />
                  <div>
                    <strong>Duration</strong>
                    <p>{workshop.duration || '2 - 3 Hours'}</p>
                  </div>
                </div>

                <div className="meta-row">
                  <Users size={20} color="#73C52A" />
                  <div>
                    <strong>Session Capacity</strong>
                    <p>{workshop.capacity || '20 - 30 Students'}</p>
                  </div>
                </div>
              </div>

              <Link to="/for-schools" className="btn-primary sidebar-cta">
                <Send size={18} />
                <span>Request Workshop for School</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .workshop-detail-page {
          padding-top: 6rem;
          padding-bottom: 4rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #73C52A;
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 2rem;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2.5rem;
        }

        .category-badge {
          display: inline-block;
          background: #73C52A;
          color: #000;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.3rem 0.8rem;
          border-radius: 9999px;
          margin-bottom: 1rem;
        }

        .detail-main h1 {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          color: #fff;
          margin-bottom: 1rem;
        }

        .short-desc {
          font-size: 1.15rem;
          color: #CBD5E1;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .media-hero {
          height: 380px;
          overflow: hidden;
          padding: 0;
          margin-bottom: 2.5rem;
        }

        .media-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .detail-box {
          padding: 2.5rem;
        }

        .detail-box h2 {
          text-align: left;
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }

        .full-desc {
          color: #CBD5E1;
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 2rem;
        }

        .section-block {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .section-block h3 {
          font-size: 1.25rem;
          color: #fff;
          margin-bottom: 1rem;
        }

        .check-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .check-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #E2E8F0;
          font-size: 1rem;
        }

        .sidebar-card {
          padding: 2rem;
          position: sticky;
          top: 7rem;
        }

        .sidebar-card h3 {
          color: #fff;
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
        }

        .sidebar-meta {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          margin-bottom: 2rem;
        }

        .meta-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .meta-row strong {
          display: block;
          color: #fff;
          font-size: 0.9rem;
        }

        .meta-row p {
          color: #94A3B8;
          font-size: 0.9rem;
        }

        .sidebar-cta {
          width: 100%;
          justify-content: center;
          padding: 0.9rem;
          font-size: 1rem;
          gap: 0.5rem;
        }

        @media (max-width: 900px) {
          .detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
