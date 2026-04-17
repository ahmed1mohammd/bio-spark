import React, { useState, useEffect } from 'react';
import { Dna, Atom, Hexagon, Activity, Share2 } from 'lucide-react';

export default function Hero() {
  const words = ["interactive labs.", "3D visualizations.", "live discovery.", "pure innovation."];
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    let timer = setTimeout(() => {
      handleType();
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, typingSpeed, loopNum]);

  const handleType = () => {
    const i = loopNum % words.length;
    const fullText = words[i];

    if (isDeleting) {
      setText(fullText.substring(0, text.length - 1));
      setTypingSpeed(40);
    } else {
      setText(fullText.substring(0, text.length + 1));
      setTypingSpeed(80);
    }

    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(500);
    }
  };

  return (
    <div className="hero-centered" id="hero-dynamic">
      {/* Background & Lighting */}
      <div className="hero-bg-layer">
        <div className="spot-center"></div>
      </div>

      {/* Biological Orbital Elements */}
      <div className="orbital-system">
        <div className="orbit orbit-1">
          <div className="bio-elem pos-1 color-green scale-lg op-high"><Dna strokeWidth={1.5} /></div>
          <div className="bio-elem pos-2 color-blue scale-md op-high"><Atom strokeWidth={1.5} /></div>
        </div>
        
        <div className="orbit orbit-2">
          <div className="bio-elem pos-3 color-light-blue scale-sm op-md"><Hexagon strokeWidth={1.5} /></div>
          <div className="bio-elem pos-4 color-green scale-lg op-md"><Share2 strokeWidth={1.5} /></div>
          <div className="bio-elem pos-5 color-blue scale-xs op-md"><Activity strokeWidth={1.5} /></div>
        </div>

        <div className="orbit orbit-3">
          <div className="bio-elem pos-6 color-green scale-xl op-low blur-sm"><Dna strokeWidth={1.5} /></div>
          <div className="bio-elem pos-7 color-light-blue scale-md op-low blur-sm"><Atom strokeWidth={1.5} /></div>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="hero-center-content">
        
        <div className="hero-character-wrapper entry-scale-in">
          <div className="character-glow"></div>
          <img 
            src="/herosec.png" 
            alt="Spark Character" 
            className="animated-character"
          />
        </div>

        <div className="hero-text-wrapper entry-fade-in">
          <h1 className="hero-h1">Biology, Brought to <span className="highlight-green">Life.</span></h1>
          
          <div className="typing-container-centered">
            <p className="hero-subtext">
              Transforming traditional lessons into <br/>
              <span className="typed-word-centered">{text}</span>
              <span className="cursor">|</span>
            </p>
          </div>
          
          <div className="hero-actions">
            <a href="https://wa.me/201140866774?text=Hello, I am interested in Bio Spark programs." target="_blank" rel="noopener noreferrer" className="btn-primary btn-pulse-center">
              Book Now
            </a>
            <a href="/articles" className="hero-sec-btn">
              Explore
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .hero-centered {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding-top: 7rem;
          padding-bottom: 4rem;
        }

        .hero-bg-layer {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, #012b7d 0%, #004391 100%);
          z-index: 0;
        }

        .spot-center {
          position: absolute;
          top: 40%; left: 50%;
          transform: translate(-50%, -50%);
          width: 90vw; height: 90vw;
          max-width: 1200px; max-height: 1200px;
          background: radial-gradient(circle, rgba(0, 139, 240, 0.25) 0%, transparent 60%);
          filter: blur(80px);
        }

        /* --- Orbital System --- */
        .orbital-system {
          position: absolute;
          top: 40%; left: 50%;
          z-index: 1;
          pointer-events: none;
        }

        .orbit {
          position: absolute;
          left: 0; top: 0;
          border-radius: 50%;
        }

        .orbit-1 { width: 450px; height: 450px; margin-left: -225px; margin-top: -225px; animation: orbitSpin 35s linear infinite; }
        .orbit-2 { width: 750px; height: 750px; margin-left: -375px; margin-top: -375px; animation: orbitSpinRev 55s linear infinite; }
        .orbit-3 { width: 1100px; height: 1100px; margin-left: -550px; margin-top: -550px; animation: orbitSpin 80s linear infinite; }

        @keyframes orbitSpin { 100% { transform: rotate(360deg); } }
        @keyframes orbitSpinRev { 100% { transform: rotate(-360deg); } }

        /* Counter rotate so elements stay upright */
        .orbit-1 .bio-elem { animation: orbitCounterSpin 35s linear infinite; }
        .orbit-2 .bio-elem { animation: orbitCounterSpinRev 55s linear infinite; }
        .orbit-3 .bio-elem { animation: orbitCounterSpin 80s linear infinite; }

        @keyframes orbitCounterSpin { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(-360deg); } }
        @keyframes orbitCounterSpinRev { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }

        .pos-1 { top: 0%; left: 50%; }
        .pos-2 { top: 75%; left: 93.3%; }
        .pos-3 { top: 50%; left: 0%; }
        .pos-4 { top: 14.6%; left: 85.3%; }
        .pos-5 { top: 85.3%; left: 14.6%; }
        .pos-6 { top: 100%; left: 50%; }
        .pos-7 { top: 50%; left: 100%; }

        .bio-elem {
          position: absolute;
          transform: translate(-50%, -50%); /* Base positioning before counter loop */
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.05);
        }

        .scale-xs { padding: 0.8rem; }
        .scale-xs svg { width: 22px; height: 22px; }
        .scale-sm { padding: 1.2rem; }
        .scale-sm svg { width: 30px; height: 30px; }
        .scale-md { padding: 1.6rem; }
        .scale-md svg { width: 38px; height: 38px; }
        .scale-lg { padding: 2rem; }
        .scale-lg svg { width: 48px; height: 48px; }
        .scale-xl { padding: 2.5rem; }
        .scale-xl svg { width: 60px; height: 60px; }

        .color-green { color: #84c233; filter: drop-shadow(0 0 15px rgba(101,169,46,0.5)); }
        .color-blue { color: #0564c2; filter: drop-shadow(0 0 15px rgba(5,100,194,0.5)); }
        .color-light-blue { color: #4cd6ff; filter: drop-shadow(0 0 15px rgba(0,139,240,0.5)); }

        .op-high { opacity: 0.9; }
        .op-md { opacity: 0.5; }
        .op-low { opacity: 0.2; }
        .blur-sm { filter: blur(4px) drop-shadow(0 0 10px rgba(255,255,255,0.1)); }

        /* --- Foreground Content --- */
        .hero-center-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          padding: 0 1.5rem;
        }

        .hero-character-wrapper {
          position: relative;
          width: 100%;
          max-width: 600px;
          margin: 0 auto 1rem auto;
          display: flex;
          justify-content: center;
        }

        .animated-character {
          width: 100%;
          height: auto;
          z-index: 2;
          animation: floatHeroCenter 6s ease-in-out infinite;
        }

        .character-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 80%; height: 80%;
          background: radial-gradient(circle, rgba(0, 139, 240, 0.6) 0%, rgba(101, 169, 46, 0.25) 60%, transparent 80%);
          border-radius: 50%;
          filter: blur(50px);
          z-index: 1;
          animation: glowPulseCenter 4s infinite alternate;
        }

        @keyframes floatHeroCenter {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
          100% { transform: translateY(0px); }
        }

        @keyframes glowPulseCenter {
          0% { opacity: 0.6; transform: translate(-50%, -50%) scale(0.85); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
        }

        .hero-text-wrapper {
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-h1 {
          font-size: clamp(2.8rem, 5vw, 4.8rem);
          color: white;
          line-height: 1.1;
          margin-bottom: 0.5rem;
          font-weight: 800;
          text-shadow: 0 4px 20px rgba(0,0,0,0.4);
          letter-spacing: -1px;
        }

        .highlight-green {
          color: var(--accent-green);
          text-shadow: 0 0 25px rgba(101, 169, 46, 0.4);
        }

        .typing-container-centered {
          min-height: 80px;
          margin-bottom: 1.5rem;
        }

        .hero-subtext {
          font-size: clamp(1.1rem, 2vw, 1.25rem);
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .typed-word-centered {
          color: white;
          font-weight: 700;
          border-bottom: 2px solid var(--accent-green);
        }

        .cursor {
          color: var(--accent-green);
          font-weight: 700;
          animation: blink 1s step-end infinite;
          margin-left: 2px;
        }

        @keyframes blink { 50% { opacity: 0 } }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-pulse-center {
          padding: 1rem 2.8rem;
          font-size: 1.1rem;
          border-radius: 99px;
          animation: pulse-glow-center 3s infinite;
        }
        
        .btn-pulse-center:hover {
          animation: none;
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 10px 30px rgba(101, 169, 46, 0.8) !important;
        }

        @keyframes pulse-glow-center {
          0% { box-shadow: 0 0 0 0 rgba(101, 169, 46, 0.5); }
          70% { box-shadow: 0 0 0 20px rgba(101, 169, 46, 0); }
          100% { box-shadow: 0 0 0 0 rgba(101, 169, 46, 0); }
        }

        .hero-sec-btn {
          padding: 1rem 2.8rem;
          font-size: 1.1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 99px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .hero-sec-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        /* Entry Animations */
        .entry-fade-in {
          animation: fadeInUpC 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .entry-scale-in {
          animation: scaleInC 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInUpC {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleInC {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 1024px) {
          .orbit-1 { width: 350px; height: 350px; margin-left: -175px; margin-top: -175px; }
          .orbit-2 { width: 550px; height: 550px; margin-left: -275px; margin-top: -275px; }
          .orbit-3 { width: 800px; height: 800px; margin-left: -400px; margin-top: -400px; }
        }

        @media (max-width: 768px) {
          .hero-centered {
            padding-top: 6rem;
          }
          .hero-character-wrapper {
             max-width: 460px;
          }
          .typing-container-centered {
             min-height: 90px;
          }
          .orbital-system {
             transform: translate(-50%, -50%) scale(0.7);
          }
        }
      `}</style>
    </div>
  );
}
