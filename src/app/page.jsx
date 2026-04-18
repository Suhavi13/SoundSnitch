"use client";

import InputForm from "@/components/InputForm";
import { motion } from "framer-motion";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .home-root {
    min-height: 100vh;
    background: #080612;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 20px;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }
  .orb1 { width: 500px; height: 500px; background: rgba(88,28,220,0.22); top: -180px; left: -160px; }
  .orb2 { width: 400px; height: 400px; background: rgba(29,78,216,0.18); bottom: -120px; right: -80px; }

  .home-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 520px;
  }

  .eyebrow {
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #8b7cf8;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
    font-family: 'DM Sans', sans-serif;
  }

  .home-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(56px, 12vw, 80px);
    font-weight: 800;
    color: #f5f0ff;
    text-align: center;
    line-height: 0.95;
    margin-bottom: 20px;
    letter-spacing: -3px;
  }

  .home-title span {
    color: #8b7cf8;
  }

  .home-sub {
    text-align: center;
    font-size: 16px;
    color: #8a7fa8;
    font-weight: 300;
    margin-bottom: 48px;
    line-height: 1.7;
  }
`;

export default function Home() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="home-root">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="home-content">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            music identity
          </motion.p>
          <motion.h1
            className="home-title"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Sound
            Snitch
          </motion.h1>
          <motion.p
            className="home-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            Enter your favorite artists or songs.<br />
            We will tell you exactly who you are.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
          >
            <InputForm />
          </motion.div>
        </div>
      </div>
    </>
  );
}