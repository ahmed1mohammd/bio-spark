import React from 'react';
import { Sparkles, FlaskConical, Dna, Hexagon, Activity } from 'lucide-react';

export default function About() {
  return (
    <div className="section about-section" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Subtle Background Elements */}
      <div className="about-bg-elements">
        <Dna className="bg-icon dna-icon" size={120} strokeWidth={1} />
        <FlaskConical className="bg-icon flask-icon" size={150} strokeWidth={1} />
      </div>

      <div className="about-container entry-fade-in-up">
        <div className="about-glass-card interactive">
          
          <div className="about-content-left">
            <h2 className="about-title">Redefining Science Education</h2>
            <p className="about-desc">
              Traditional textbooks only tell half the story. We provide the tools, expertise, and excitement to complete the narrative.
            </p>
            
            <div className="about-experiments-badge">
              <Sparkles size={20} color="var(--accent-green)" />
              <span>Live School Experiments</span>
            </div>
          </div>

          <div className="about-content-right">
            <div className="about-image-wrapper">
              <img src="/About.png" alt="Spark Character" className="about-spark-char float-slow" />
              <div className="about-bio-elem about-elem-1 color-green scale-lg op-high">
                <Dna strokeWidth={1.5} />
              </div>
              <div className="about-bio-elem about-elem-2 color-light-blue scale-md op-md">
                <Hexagon strokeWidth={1.5} />
              </div>
              <div className="about-bio-elem about-elem-3 color-green scale-sm op-md">
                <Activity strokeWidth={1.5} />
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <style>{`
        .about-section {
          padding-top: 6rem;
          padding-bottom: 4rem;
          position: relative;
        }

        .about-bg-elements {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-icon {
          position: absolute;
          color: rgba(255, 255, 255, 0.03);
        }
        .dna-icon { right: 5%; top: 10%; transform: rotate(15deg); }
        .flask-icon { left: -2%; bottom: 20%; transform: rotate(-20deg); }

        .about-container {
          position: relative;
          z-index: 10;
          max-width: 1100px;
          margin: 0 auto;
        }

        .about-glass-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 20, 50, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 4rem 5rem;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          transition: all 0.4s ease;
          overflow: hidden;
          position: relative;
        }

        .about-glass-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.4), 0 0 30px rgba(0, 139, 240, 0.15);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .about-glass-card::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: linear-gradient(to bottom right, rgba(255,255,255,0.05) 0%, transparent 40%, transparent 100%);
          pointer-events: none;
        }

        .about-content-left {
          flex: 1;
          max-width: 520px;
          position: relative;
          z-index: 2;
        }

        .about-title {
          font-size: clamp(2.5rem, 4vw, 3.2rem);
          color: white;
          line-height: 1.15;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .about-desc {
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 3rem;
        }

        .about-experiments-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 1.5rem;
          background: rgba(101, 169, 46, 0.15);
          border: 1px solid rgba(101, 169, 46, 0.3);
          border-radius: 99px;
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
          box-shadow: 0 4px 15px rgba(101, 169, 46, 0.1);
          transition: all 0.3s;
        }

        .about-experiments-badge:hover {
          background: rgba(101, 169, 46, 0.25);
          box-shadow: 0 4px 20px rgba(101, 169, 46, 0.2);
        }

        .about-content-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .about-image-wrapper {
          position: relative;
          width: 100%;
          max-width: 650px;
        }

        .about-image-wrapper::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 80%; height: 80%;
          background: radial-gradient(circle, rgba(0, 139, 240, 0.5) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(40px);
          z-index: 0;
        }

        .about-spark-char {
          width: 100%;
          height: auto;
          position: relative;
          z-index: 2;
        }

        .float-slow {
          animation: floatUpDownAbout 6s ease-in-out infinite;
        }

        @keyframes floatUpDownAbout {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .about-bio-elem {
          position: absolute;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.05);
          z-index: 3;
        }

        .about-elem-1 { top: 5%; right: -5%; animation: floatOrbit1 4s ease-in-out infinite alternate; }
        .about-elem-2 { bottom: 15%; left: 0%; animation: floatOrbit2 5s ease-in-out infinite alternate-reverse; }
        .about-elem-3 { top: 20%; left: -10%; animation: floatOrbit3 6s ease-in-out infinite alternate; }
        
        .scale-sm { padding: 1rem; }
        .scale-sm svg { width: 26px; height: 26px; }
        .scale-md { padding: 1.4rem; }
        .scale-md svg { width: 34px; height: 34px; }
        .scale-lg { padding: 1.8rem; }
        .scale-lg svg { width: 44px; height: 44px; }

        .color-green { color: #84c233; filter: drop-shadow(0 0 15px rgba(101,169,46,0.6)); }
        .color-light-blue { color: #4cd6ff; filter: drop-shadow(0 0 15px rgba(0,139,240,0.6)); }
        
        .op-high { opacity: 0.9; }
        .op-md { opacity: 0.6; }

        @keyframes floatOrbit1 {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translate(-15px, -20px) rotate(15deg); }
        }
        @keyframes floatOrbit2 {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translate(20px, -15px) rotate(-10deg); }
        }
        @keyframes floatOrbit3 {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translate(-10px, 20px) rotate(20deg); }
        }

        .entry-fade-in-up {
          animation: fadeInUpAbout 1s forwards;
        }

        @keyframes fadeInUpAbout {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .about-glass-card {
            flex-direction: column;
            padding: 3rem 2rem;
            text-align: center;
          }
          .about-content-left {
            margin-bottom: 3rem;
          }
          .about-image-wrapper {
             max-width: 400px;
             margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
