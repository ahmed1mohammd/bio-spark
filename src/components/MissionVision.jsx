import React from 'react';
import { Target, Eye } from 'lucide-react';
import Card3D from './Card3D';

export default function MissionVision() {
  return (
    <div className="section mv-section">
      
      <div className="mv-container">
        
        {/* Connection Line / Bridge */}
        <div className="mv-connection-bridge"></div>

        {/* Mission Card */}
        <div className="mv-card-outer entry-slide-left">
          <img src="/main.png" alt="Bio Spark Mascot" className="floating-mascot mascot-left" />
          <Card3D className="mv-card mv-mission">
            <div className="mv-card-glow glow-blue"></div>
            <div className="mv-card-content glass-panel-custom">
              <div className="mv-icon-wrapper icon-blue">
                <Target size={32} />
              </div>
              <h2 className="mv-title">Our Mission</h2>
              <p className="mv-desc">
                To simplify biotechnology education through interactive and engaging experiences that combine science with real-world applications—empowering students to understand, apply, and enjoy biology beyond the classroom.
              </p>
            </div>
          </Card3D>
        </div>

        {/* Vision Card */}
        <div className="mv-card-outer entry-slide-right">
          <img src="/main.png" alt="Bio Spark Mascot" className="floating-mascot mascot-right" />
          <Card3D className="mv-card mv-vision">
            <div className="mv-card-glow glow-green-blue"></div>
            <div className="mv-card-content glass-panel-custom glass-green-accent">
              <div className="mv-icon-wrapper icon-green">
                <Eye size={32} />
              </div>
              <h2 className="mv-title">Our Vision</h2>
              <p className="mv-desc">
                To become a leading edutainment platform in biotechnology, transforming how science is taught and experienced, and inspiring the next generation of innovators across Egypt and beyond.
              </p>
            </div>
          </Card3D>
        </div>

      </div>

      <style>{`
        .mv-section {
          padding-top: 6rem;
          padding-bottom: 6rem;
          position: relative;
        }

        .mv-container {
          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Desktop gradient connection bridge */
        .mv-connection-bridge {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 50%;
          height: 3px;
          background: linear-gradient(90deg, var(--light-blue), var(--accent-green));
          z-index: 0;
          opacity: 0.5;
          box-shadow: 0 0 15px rgba(101, 169, 46, 0.4);
        }

        .mv-card-outer {
          flex: 1;
          position: relative;
          max-width: 500px;
          display: flex;
          flex-direction: column;
        }

        .mv-card {
          flex: 1;
          position: relative;
          width: 100%;
        }

        .mv-card-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 90%; height: 90%;
          border-radius: 30px;
          filter: blur(40px);
          z-index: 0;
        }
        .glow-blue { background: radial-gradient(circle, rgba(0, 139, 240, 0.4) 0%, transparent 70%); }
        .glow-green-blue { background: radial-gradient(circle, rgba(101, 169, 46, 0.25) 0%, rgba(0, 139, 240, 0.2) 60%, transparent 80%); }

        .mv-card-content {
          position: relative;
          z-index: 1;
          height: 100%;
          background: rgba(0, 20, 50, 0.4);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 3.2rem 2.8rem;
          display: flex;
          flex-direction: column;
          transition: all 0.4s ease;
        }

        .glass-green-accent {
          border: 1px solid rgba(101, 169, 46, 0.15);
          background: rgba(5, 35, 50, 0.4);
        }

        .mv-card:hover .mv-card-content {
          transform: translateY(-8px);
        }
        
        .mv-mission:hover .mv-card-content {
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 25px rgba(0, 139, 240, 0.25);
          border-color: rgba(0, 139, 240, 0.4);
        }

        .mv-vision:hover .mv-card-content {
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 25px rgba(101, 169, 46, 0.25);
          border-color: rgba(101, 169, 46, 0.4);
        }

        .mv-icon-wrapper {
          width: 65px; height: 65px;
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 2rem;
          color: white;
          position: relative;
          z-index: 2;
        }

        .icon-blue {
          background: linear-gradient(135deg, var(--light-blue), #0145a8);
          box-shadow: 0 5px 15px rgba(0, 139, 240, 0.3);
        }

        .icon-green {
          background: linear-gradient(135deg, var(--accent-green), var(--primary-blue));
          box-shadow: 0 5px 15px rgba(101, 169, 46, 0.3);
        }

        .mv-title {
          font-size: 2.2rem;
          color: white;
          margin-bottom: 1.5rem;
          font-weight: 700;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .mv-desc {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.75;
          text-align: left;
          flex: 1;
          margin: 0;
          position: relative;
          z-index: 2;
        }

        .entry-slide-left { animation: slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .entry-slide-right { animation: slideInRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .floating-mascot {
          position: absolute !important;
          width: 80px !important;
          height: auto !important;
          top: -28px !important;
          right: 15px !important;
          z-index: 50 !important;
          filter: drop-shadow(0 6px 12px rgba(0,0,0,0.4));
          animation: floatMascot 4s ease-in-out infinite;
          pointer-events: none;
        }

        .mascot-right {
          animation-delay: 1s;
        }

        @keyframes floatMascot {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
        }

        @media (max-width: 900px) {
          .mv-container {
            flex-direction: column;
            align-items: center;
            gap: 3.5rem;
          }
          .mv-connection-bridge {
            width: 3px;
            height: 100px;
            background: linear-gradient(180deg, var(--light-blue), var(--accent-green));
            opacity: 0.4;
          }
          .mv-card-content {
             padding: 2.8rem 2rem;
          }
          .floating-mascot {
             width: 65px !important;
             top: -22px !important;
             right: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}
