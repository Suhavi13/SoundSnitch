"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .pr-root {
    min-height: 100vh;
    background: #080612;
    font-family: 'DM Sans', sans-serif;
    color: #ede9fe;
    position: relative;
    overflow: hidden;
  }

  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }
  .orb1 { width: 500px; height: 500px; background: rgba(88,28,220,0.2); top: -180px; left: -160px; }
  .orb2 { width: 400px; height: 400px; background: rgba(29,78,216,0.16); bottom: -120px; right: -80px; }

  .pr-content {
    position: relative;
    z-index: 1;
    max-width: 600px;
    margin: 0 auto;
    padding: 52px 20px 80px;
  }

  .pr-site-label {
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 5px;
    color: #5c5278;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 52px;
  }

  /* Persona card */
  .persona-card {
    background: rgba(91,33,182,0.1);
    border: 1px solid rgba(139,92,246,0.22);
    border-radius: 22px;
    padding: 40px 32px 36px;
    text-align: center;
    margin-bottom: 14px;
  }

  .persona-eyebrow {
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #7c5cbf;
    font-weight: 600;
    margin-bottom: 18px;
  }

  .persona-name {
    font-family: 'Syne', sans-serif;
    font-size: clamp(30px, 6vw, 44px);
    font-weight: 800;
    color: #f5f0ff;
    line-height: 1.05;
    margin-bottom: 22px;
    letter-spacing: -1px;
  }

  .persona-divider {
    width: 32px;
    height: 2px;
    background: #5b21b6;
    margin: 0 auto 22px;
    border-radius: 2px;
  }

  .persona-desc {
    font-size: 15px;
    line-height: 1.8;
    color: #c4b8e8;
    font-weight: 300;
    max-width: 460px;
    margin: 0 auto;
  }

  .tags-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-top: 28px;
  }

  .tag {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 6px 13px;
    border-radius: 999px;
    border: 1px solid rgba(139,92,246,0.28);
    color: #a89cf0;
    background: rgba(91,33,182,0.12);
  }

  /* Section cards */
  .section-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 18px;
    padding: 22px;
    margin-bottom: 14px;
  }

  .section-label {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #4a3f6b;
    font-weight: 600;
    margin-bottom: 14px;
  }

  .pill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .pill-entry {
    font-size: 13px;
    padding: 6px 13px;
    border-radius: 999px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    color: #d4ccea;
  }

  .pill-genre {
    font-size: 12px;
    font-weight: 500;
    padding: 6px 13px;
    border-radius: 999px;
    background: rgba(91,33,182,0.18);
    border: 1px solid rgba(139,92,246,0.25);
    color: #c4b5fd;
    text-transform: capitalize;
  }

  /* Stat grid */
  .stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 18px;
  }

  .stat-box {
    background: rgba(91,33,182,0.1);
    border: 1px solid rgba(139,92,246,0.15);
    border-radius: 12px;
    padding: 16px 14px;
    text-align: center;
  }

  .stat-val {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #d4c8ff;
  }

  .stat-lbl {
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #4a3f6b;
    margin-top: 5px;
  }

  /* Popularity bar */
  .pop-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
  }

  .pop-number {
    font-family: 'Syne', sans-serif;
    font-size: 38px;
    font-weight: 800;
    color: #f5f0ff;
    line-height: 1;
  }

  .pop-label {
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #4a3f6b;
  }

  .pop-track {
    width: 100%;
    height: 5px;
    background: rgba(255,255,255,0.06);
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 18px;
  }

  .pop-fill {
    height: 100%;
    background: #5b21b6;
    border-radius: 999px;
  }

  .back-btn {
    display: block;
    text-align: center;
    margin-top: 40px;
    font-size: 12px;
    color: #3d3460;
    cursor: pointer;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    transition: color 0.18s;
    font-family: 'DM Sans', sans-serif;
    border: none;
    background: none;
    width: 100%;
  }
  .back-btn:hover { color: #a89cf0; }
`;

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
};

export default function TasteProfile({ data }) {
  const { personality, features, entries } = data;
  const router = useRouter();



  return (
    <>
      <style>{STYLES}</style>
      <div className="pr-root">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="pr-content">

          <motion.p className="pr-site-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            SoundSnitch
          </motion.p>

          <motion.div variants={container} initial="hidden" animate="show">

            {/* Persona result */}
            <motion.div variants={item} className="persona-card">
              <p className="persona-eyebrow">your music persona</p>
              <h1 className="persona-name">{personality.persona}</h1>
              <div className="persona-divider" />
              <p className="persona-desc">{personality.description}</p>
              <div className="tags-row">
                {personality.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </motion.div>

            {/* Based on */}
            <motion.div variants={item} className="section-card">
              <p className="section-label">based on</p>
              <div className="pill-list">
                {entries.map((e, i) => <span key={i} className="pill-entry">{e}</span>)}
              </div>
            </motion.div>

          </motion.div>

          <motion.button
            className="back-btn"
            onClick={() => router.push("/")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            analyze different artists
          </motion.button>

        </div>
      </div>
    </>
  );
}