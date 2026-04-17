import React from 'react';
import { Eye, Dna, Hand, Sparkles, Presentation, Atom } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Eye,
      title: "Learn by Seeing, Not Memorizing",
      description: "We transform complex biology into clear visual experiences through interactive content and 3D models, making learning intuitive and engaging.",
      color: 'var(--light-blue)'
    },
    {
      icon: Dna,
      title: "Real-World Biotech, Not Just Theory",
      description: "Our content connects science to real applications—preparing students for careers in biotechnology, not just exams.",
      color: 'var(--accent-green)'
    },
    {
      icon: Hand,
      title: "Interactive & Hands-On Approach",
      description: "From experiments to workshops, BioSpark turns students into active learners, not passive listeners.",
      color: 'var(--light-blue)'
    },
    {
      icon: Sparkles,
      title: "Edutainment Experience",
      description: "We combine education with entertainment to create engaging, memorable experiences that make students enjoy learning, not just study it.",
      color: 'var(--accent-green)'
    },
    {
      icon: Presentation,
      title: "Live Educational Shows",
      description: "We deliver dynamic live shows that blend science, storytelling, and visual demonstrations—creating unforgettable moments for students.",
      color: 'var(--light-blue)'
    },
    {
      icon: Atom,
      title: "Modern Learning Experience",
      description: "We use advanced visualizations and innovative teaching methods to make biology more dynamic and relevant.",
      color: 'var(--accent-green)'
    }
  ];

  return (
    <div className="section" style={{ paddingTop: '6rem', paddingBottom: '6rem', position: 'relative' }}>
      
      {/* Background Floating DNA */}
      <div className="why-bg-element">
        <Dna className="bg-dna-why float-why" size={320} strokeWidth={0.5} />
        <Dna className="bg-dna-why-2 float-why-reverse" size={240} strokeWidth={0.5} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '750px', margin: '0 auto 4rem' }}>
        <h5 style={{ color: 'var(--accent-green)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
          The Bio Spark Advantage
        </h5>
        <h2 style={{ fontSize: '2.8rem', marginBottom: '1.5rem', color: 'white' }}>Why Choose BioSpark</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.7' }}>
          We don't just demonstrate science; we immerse students in it. Discover what makes our tailored packages the preferred choice for forward-thinking educators.
        </p>
      </div>
      
      <div className="why-bento">
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <div key={index} className="bento-card glass-panel" style={{ '--card-color': reason.color }}>
              <div className="card-number">0{index + 1}</div>
              
              <div className="icon-wrapper">
                <Icon className="lucide-icon" size={32} strokeWidth={1.5} />
              </div>
              
              <h3 className="bento-title">{reason.title}</h3>
              <p className="bento-desc">{reason.description}</p>
            </div>
          );
        })}
      </div>

      <style>{`
        .why-bg-element {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .bg-dna-why {
          position: absolute;
          color: rgba(255, 255, 255, 0.03);
          right: -5%;
          top: 10%;
          transform: rotate(15deg);
        }

        .bg-dna-why-2 {
          position: absolute;
          color: rgba(255, 255, 255, 0.02);
          left: -5%;
          bottom: 15%;
          transform: rotate(-15deg);
        }

        .float-why {
          animation: floatWhy 8s ease-in-out infinite alternate;
        }

        .float-why-reverse {
          animation: floatWhyRev 9s ease-in-out infinite alternate;
        }

        @keyframes floatWhy {
          0% { transform: translateY(0) rotate(15deg); }
          100% { transform: translateY(-30px) rotate(15deg); }
        }

        @keyframes floatWhyRev {
          0% { transform: translateY(0) rotate(-15deg); }
          100% { transform: translateY(25px) rotate(-15deg); }
        }

        .why-bento {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(3, 1fr);
        }

        .bento-card {
          padding: 3rem 2.5rem;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(0, 20, 50, 0.4);
          border-radius: 20px;
        }

        .bento-card:hover {
          transform: translateY(-8px);
          border-color: var(--card-color);
          background: rgba(0, 30, 70, 0.6);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255, 255, 255, 0.05);
        }

        .bento-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 4px;
          background: var(--card-color);
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .bento-card:hover::before {
          opacity: 1;
        }

        .card-number {
          position: absolute;
          top: -20px;
          right: -10px;
          font-size: 9rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.03);
          line-height: 1;
          pointer-events: none;
          z-index: 0;
          transition: color 0.4s ease;
        }

        .bento-card:hover .card-number {
          color: rgba(255, 255, 255, 0.06);
        }

        .icon-wrapper {
          width: 65px;
          height: 65px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 1;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: inset 0 2px 10px rgba(255,255,255,0.05);
          transition: all 0.4s ease;
          color: var(--card-color);
        }
        
        .lucide-icon {
          transition: all 0.4s ease;
          filter: drop-shadow(0 0 4px rgba(255,255,255,0.1));
        }

        .bento-card:hover .icon-wrapper {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--card-color);
          box-shadow: inset 0 2px 15px rgba(255,255,255,0.1), 0 0 15px var(--card-color);
        }

        .bento-card:hover .lucide-icon {
          transform: scale(1.15);
          filter: drop-shadow(0 0 8px var(--card-color));
          color: white;
        }

        .bento-title {
          font-size: 1.4rem;
          margin-bottom: 1rem;
          color: white;
          position: relative;
          z-index: 1;
          font-weight: 700;
          line-height: 1.3;
        }

        .bento-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 1024px) {
          .why-bento {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .why-bento {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .bento-card {
            padding: 2.5rem 2rem;
          }
        }
      `}</style>
    </div>
  );
}
