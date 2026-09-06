import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, CheckCircle2, ArrowLeft, Send } from 'lucide-react';
import { fetchCampBySlug } from '../services/api';

export default function CampDetail() {
  const { slug } = useParams();
  const [camp, setCamp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCamp() {
      try {
        const res = await fetchCampBySlug(slug);
        if (res?.data?.data) {
          setCamp(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching camp:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCamp();
  }, [slug]);

  if (loading) return <div className="section" style={{ paddingTop: '8rem', textAlign: 'center' }}><p>Loading camp details...</p></div>;
  if (!camp) return <div className="section" style={{ paddingTop: '8rem', textAlign: 'center' }}><h2>Camp Not Found</h2><Link to="/camps" className="btn-primary">Back to Camps</Link></div>;

  return (
    <div className="camp-detail-page">
      <section className="section detail-container">
        <Link to="/camps" className="back-link"><ArrowLeft size={18} /><span>Back to All Camps</span></Link>

        <div className="detail-grid">
          <div className="detail-main">
            <div className="category-badge">{camp.category}</div>
            <h1>{camp.title}</h1>
            <p className="short-desc">{camp.description}</p>

            <div className="media-hero glass-panel">
              <img src={camp.imageUrl || '/main.png'} alt={camp.title} onError={(e) => { e.target.src = '/main.png'; }} />
            </div>

            {camp.activities?.length > 0 && (
              <div className="glass-panel detail-box">
                <h2>Camp Activities & Highlights</h2>
                <ul className="check-list">
                  {camp.activities.map((act, i) => (
                    <li key={i}>
                      <CheckCircle2 size={18} color="#73C52A" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="detail-sidebar">
            <div className="glass-panel sidebar-card">
              <h3>Camp Summary</h3>
              <div className="sidebar-meta">
                <div className="meta-row"><Users size={20} color="#73C52A" /><div><strong>Target Age</strong><p>{camp.ageRange}</p></div></div>
                <div className="meta-row"><Clock size={20} color="#73C52A" /><div><strong>Duration</strong><p>{camp.duration}</p></div></div>
                <div className="meta-row"><Calendar size={20} color="#73C52A" /><div><strong>Dates</strong><p>{camp.dates}</p></div></div>
                <div className="meta-row"><MapPin size={20} color="#73C52A" /><div><strong>Location</strong><p>{camp.location}</p></div></div>
              </div>

              <div className="price-box">
                <span>Tuition Fee</span>
                <h4>{camp.price > 0 ? `$${camp.price}` : 'Free / Sponsored'}</h4>
              </div>

              <a 
                href={`https://wa.me/201140866774?text=${encodeURIComponent(`Hello BioSpark, I want to register for camp: ${camp.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary sidebar-cta"
              >
                <Send size={18} />
                <span>Register via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .camp-detail-page { padding-top: 6rem; padding-bottom: 4rem; }
        .back-link { display: inline-flex; align-items: center; gap: 0.5rem; color: #73C52A; text-decoration: none; font-weight: 600; margin-bottom: 2rem; }
        .detail-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2.5rem; }
        .category-badge { display: inline-block; background: #73C52A; color: #000; font-weight: 700; font-size: 0.85rem; padding: 0.3rem 0.8rem; border-radius: 9999px; margin-bottom: 1rem; }
        .detail-main h1 { font-size: clamp(2rem, 3.5vw, 2.8rem); color: #fff; margin-bottom: 1rem; }
        .short-desc { font-size: 1.15rem; color: #CBD5E1; margin-bottom: 2rem; line-height: 1.6; }
        .media-hero { height: 380px; overflow: hidden; padding: 0; margin-bottom: 2.5rem; }
        .media-hero img { width: 100%; height: 100%; object-fit: cover; }
        .detail-box { padding: 2.5rem; }
        .detail-box h2 { text-align: left; font-size: 1.6rem; margin-bottom: 1.5rem; }
        .check-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem; }
        .check-list li { display: flex; align-items: center; gap: 0.75rem; color: #E2E8F0; font-size: 1.05rem; }
        .sidebar-card { padding: 2rem; position: sticky; top: 7rem; }
        .sidebar-card h3 { color: #fff; font-size: 1.3rem; margin-bottom: 1.5rem; }
        .sidebar-meta { display: flex; flex-direction: column; gap: 1.2rem; margin-bottom: 1.5rem; }
        .meta-row { display: flex; align-items: flex-start; gap: 1rem; }
        .meta-row strong { display: block; color: #fff; font-size: 0.9rem; }
        .meta-row p { color: #94A3B8; font-size: 0.9rem; }
        .price-box { background: rgba(115, 197, 42, 0.12); padding: 1rem; border-radius: 12px; border: 1px solid rgba(115, 197, 42, 0.3); margin-bottom: 1.5rem; text-align: center; }
        .price-box span { color: #94A3B8; font-size: 0.85rem; }
        .price-box h4 { font-size: 1.6rem; color: #73C52A; }
        .sidebar-cta { width: 100%; justify-content: center; padding: 0.9rem; font-size: 1rem; gap: 0.5rem; }
        @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
