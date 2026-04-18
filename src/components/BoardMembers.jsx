import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaFacebook, FaTiktok } from 'react-icons/fa';

export default function BoardMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMembers([
        {
          id: 1,
          name: "Dr_Zeee",
          role: "CEO & Founder | Science Communicator | Lab Specialist",
          description: "Driven by a passion to make science accessible, interactive, and beautifully engaging for all ages.",
          image: "https://i.ibb.co/Swf7dWKP/1253ad67-7fdc-438e-b138-3945c710d495.jpg",
          imagePosition: "center top",
          linkedin: "https://www.linkedin.com/in/zyad-khalil-856071288?trk=contact-info",
          facebook: "https://www.facebook.com/share/1WK8z3N1bD/?mibextid=wwXIfr",
          tiktok: "https://www.tiktok.com/@zyadmarcello?is_from_webapp=1&sender_device=pc"
        },
        {
          id: 2,
          name: "Dr- Manar",
          role: "Co-founder",
          description: "I'm a science communicator who can turn biology into fun and interactive experiences, and also let you experiment and explore everything on your own.",
          image: "https://i.ibb.co/tM3SJCFR/8e9c6115-2587-41b6-a9bf-36f459d64454.jpg",
          imagePosition: "center 30%",
          linkedin: "#", facebook: "#", tiktok: "#"
        }
      ]);
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div className="section" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '6rem', fontSize: '2.5rem' }}>The Minds Behind Bio Spark</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading team members...</div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '3rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {members.map(member => (
              <div key={member.id} className="team-card glass-panel interactive">
                <div className="floating-avatar">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="avatar-img"
                    style={{ objectPosition: member.imagePosition || 'center' }}
                  />
                </div>
                <div className="team-content">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-desc">{member.description}</p>
                  
                  <div className="social-links">
                    <a href={member.linkedin} className="social-icon" aria-label="LinkedIn"><FaLinkedin /></a>
                    <a href={member.facebook} className="social-icon" aria-label="Facebook"><FaFacebook /></a>
                    <a href={member.tiktok} className="social-icon" aria-label="TikTok"><FaTiktok /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .team-card {
          position: relative;
          border-radius: 24px;
          text-align: center;
          padding: 8.5rem 2.5rem 2.5rem 2.5rem;
          margin-top: 120px; /* Space for the floating avatar */
          background: rgba(10, 25, 50, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .floating-avatar {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 240px;
          height: 240px;
          border-radius: 50%;
          border: 4px solid var(--accent-cyan);
          padding: 5px;
          background: #001428; /* Matching the site dark bg to prevent transparency issues */
          box-shadow: 0 15px 35px rgba(0, 139, 240, 0.35);
          z-index: 10;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top; /* Ensures the top of the photo (like heads) doesn't get cropped */
          border-radius: 50%;
        }

        .team-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          width: 100%;
        }

        .team-name {
          font-size: 1.6rem;
          color: white;
          margin-bottom: 0.4rem;
        }

        .team-role {
          font-size: 1rem;
          color: var(--accent-cyan);
          font-weight: 600;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .team-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          flex: 1;
        }

        .social-links {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: auto;
        }

        .social-icon {
          color: var(--text-secondary);
          font-size: 1.2rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
        }

        .social-icon:hover {
          color: white;
          background: var(--accent-cyan);
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 139, 240, 0.4);
        }
      `}</style>
    </div>
  );
}
