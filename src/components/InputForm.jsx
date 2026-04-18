"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ModeToggle from "./ModeToggle";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

  .form-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(139,92,246,0.18);
    border-radius: 20px;
    padding: 24px;
    font-family: 'DM Sans', sans-serif;
  }

  .form-input {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(139,92,246,0.2);
    border-radius: 10px;
    padding: 11px 14px;
    font-size: 14px;
    color: #ede9fe;
    outline: none;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.18s, background 0.18s;
  }
  .form-input::placeholder { color: #3d3460; }
  .form-input:focus {
    border-color: #7c3aed;
    background: rgba(109,40,217,0.08);
  }

  .remove-btn {
    background: none;
    border: none;
    color: #3d3460;
    font-size: 18px;
    cursor: pointer;
    padding: 0 4px;
    transition: color 0.18s;
    line-height: 1;
    flex-shrink: 0;
  }
  .remove-btn:hover { color: #f87171; }

  .add-btn {
    width: 100%;
    background: none;
    border: 1px dashed rgba(139,92,246,0.2);
    border-radius: 10px;
    padding: 10px;
    font-size: 13px;
    color: #5c5278;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.18s;
    margin-bottom: 14px;
  }
  .add-btn:hover { border-color: #7c3aed; color: #a89cf0; }

  .submit-btn {
    width: 100%;
    background: #5b21b6;
    border: none;
    border-radius: 12px;
    padding: 14px;
    font-size: 15px;
    font-weight: 500;
    color: #ede9fe;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.18s, transform 0.1s;
    letter-spacing: 0.2px;
  }
  .submit-btn:hover { background: #6d28d9; }
  .submit-btn:active { transform: scale(0.99); }
  .submit-btn:disabled { opacity: 0.35; cursor: not-allowed; }

  .form-hint {
    text-align: center;
    font-size: 11px;
    color: #3d3460;
    margin-top: 14px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .form-label {
    font-size: 11px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #5c5278;
    margin-bottom: 10px;
    display: block;
  }

  .error-msg { color: #f87171; font-size: 13px; margin-bottom: 10px; }
`;

export default function InputForm() {
  const router = useRouter();
  const [mode, setMode] = useState("artists");
  const [entries, setEntries] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (i, v) => { const u = [...entries]; u[i] = v; setEntries(u); };
  const handleAdd = () => { if (entries.length < 10) setEntries([...entries, ""]); };
  const handleRemove = (i) => { const u = entries.filter((_, j) => j !== i); setEntries(u.length === 0 ? [""] : u); };

  const handleSubmit = async () => {
    const filtered = entries.filter((e) => e.trim() !== "");
    if (filtered.length === 0) { setError("Please enter at least one artist or song."); return; }
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, entries: filtered }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); setLoading(false); return; }
      sessionStorage.setItem("soundself_result", JSON.stringify(data));
      router.push("/results");
    } catch { setError("Failed to connect. Please try again."); setLoading(false); }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="form-card">
        <ModeToggle mode={mode} setMode={setMode} />
        <span className="form-label">add up to 10 {mode}</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
          <AnimatePresence>
            {entries.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                style={{ display: "flex", gap: 8, alignItems: "center" }}
              >
                <input
                  className="form-input"
                  type="text"
                  value={entry}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder={mode === "artists" ? `Artist ${index + 1}...` : `Song ${index + 1}...`}
                />
                {/* remove entry button */}
                {entries.length > 1 && (
                  <button className="remove-btn" onClick={() => handleRemove(index)}>x</button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* add another entry button (disabled at 10 entries) */}
        {entries.length < 10 && (
          <button className="add-btn" onClick={handleAdd}>+ add another {mode === "artists" ? "artist" : "song"}</button>
        )}
        {error && <p className="error-msg">{error}</p>}
        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze my taste"}
        </button>
        {/* footer */}
        <p className="form-hint">Spotify + Groq AI</p>
      </div>
    </>
  );
}