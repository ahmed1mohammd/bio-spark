import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaFacebook, FaTiktok } from 'react-icons/fa';
import { Dna } from 'lucide-react';
import { fetchBoardMembers } from '../services/api';

const defaultLeadership = [
  {
    _id: '1',
    name: "Dr_Zeee",
    role: "CEO & Founder | Lab Specialist",
    description: "Biotechnology expert passionate about interactive STEM learning and science communication.",
    image: "https://i.ibb.co/Swf7dWKP/1253ad67-7fdc-438e-b138-3945c710d495.jpg",
    linkedin: "https://www.linkedin.com/in/zyad-khalil-856071288?trk=contact-info",
    facebook: "https://www.facebook.com/share/1BAxxzyTwt/",
    tiktok: "https://www.tiktok.com/@biospark2?is_from_webapp=1&sender_device=pc"
  },
  {
    _id: '2',
    name: "Dr- Manar",
    role: "Co-founder & Academic Director",
    description: "Science communicator turning complex biology into fun, hands-on scientific experiences.",
    image: "https://i.ibb.co/tM3SJCFR/8e9c6115-2587-41b6-a9bf-36f459d64454.jpg",
    linkedin: "#", 
    facebook: "https://www.facebook.com/share/1BAxxzyTwt/", 
    tiktok: "https://www.tiktok.com/@biospark2?is_from_webapp=1&sender_device=pc"
  }
];

export default function BoardMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await fetchBoardMembers();
        if (res?.data?.data && res.data.data.length > 0) {
          setMembers(res.data.data);
        } else {
          setMembers(defaultLeadership);
        }
      } catch (err) {
        console.error('Error fetching board members:', err);
        setMembers(defaultLeadership);
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, []);

  return (
    <div className="leadership-container">
      {/* Header Section */}
      <div className="leadership-header">
        <span className="leadership-tag">OUR LEADERSHIP</span>
        <h2>Meet the <span className="highlight-green">BioSpark Board</span></h2>
        
        {/* Decorative DNA Divider */}
        <div className="dna-divider">
          <div className="line"></div>
          <Dna size={22} color="var(--accent-green)" className="dna-icon" />
          <div className="line"></div>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-spinner">Loading leadership team...</div>
      ) : (
        <div className="board-grid">
          {members.map((member) => (
            <div key={member._id || member.id} className="board-card glass-panel interactive">
              <div className="avatar-wrapper">
                <img 
                  src={member.image || member.imageUrl} 
                  alt={member.name} 
                  className="board-avatar"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>

              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-bio">{member.description || member.bio}</p>
              
              <div className="member-socials">
                {member.linkedin && member.linkedin !== '#' && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn linkedin" aria-label="LinkedIn">
                    <FaLinkedin size={18} />
                  </a>
                )}
                {member.facebook && member.facebook !== '#' && (
                  <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="social-btn facebook" aria-label="Facebook">
                    <FaFacebook size={18} />
                  </a>
                )}
                {member.tiktok && member.tiktok !== '#' && (
                  <a href={member.tiktok} target="_blank" rel="noopener noreferrer" className="social-btn tiktok" aria-label="TikTok">
                    <FaTiktok size={18} />
                  </a>
                )}
                {(!member.linkedin || member.linkedin === '#') && (!member.facebook || member.facebook === '#') && (
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn linkedin" aria-label="LinkedIn">
                    <FaLinkedin size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .leadership-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .leadership-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .leadership-tag {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--accent-green);
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 0.5rem;
        }

        .leadership-header h2 {
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .highlight-green {
          color: var(--accent-green);
        }

        .dna-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin: 0 auto;
          max-width: 280px;
        }

        .dna-divider .line {
          height: 2px;
          flex-grow: 1;
          background: linear-gradient(90deg, transparent, rgba(101, 169, 46, 0.5), transparent);
        }

        .dna-icon {
          animation: spinDNA 12s linear infinite;
        }

        @keyframes spinDNA {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-spinner {
          text-align: center;
          padding: 3rem;
          color: var(--text-secondary);
        }

        .board-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.8rem;
          justify-content: center;
        }

        .board-card {
          border-radius: 20px;
          padding: 2.2rem 1.5rem 1.8rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .board-card:hover {
          transform: translateY(-8px);
          border-color: rgba(101, 169, 46, 0.4);
          box-shadow: 0 20px 45px rgba(0, 139, 240, 0.25), 0 0 20px rgba(101, 169, 46, 0.2);
        }

        .avatar-wrapper {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 1.2rem;
          border: 3px solid var(--accent-green);
          box-shadow: 0 8px 20px rgba(101, 169, 46, 0.3);
          background: rgba(255, 255, 255, 0.1);
        }

        .board-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        .member-name {
          font-size: 1.2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.3rem;
        }

        .member-role {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-green);
          margin-bottom: 0.8rem;
          line-height: 1.3;
        }

        .member-bio {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .member-socials {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .social-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(101, 169, 46, 0.15);
          border: 1px solid rgba(101, 169, 46, 0.3);
          color: var(--accent-green);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .social-btn:hover {
          background: var(--accent-green);
          color: #ffffff;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(101, 169, 46, 0.4);
        }
      `}</style>
    </div>
  );
}
