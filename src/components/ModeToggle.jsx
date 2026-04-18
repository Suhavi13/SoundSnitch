"use client";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');
  .toggle-wrap {
    display: flex;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(139,92,246,0.18);
    border-radius: 10px;
    padding: 3px;
    margin-bottom: 20px;
    font-family: 'DM Sans', sans-serif;
  }
  .toggle-btn {
    flex: 1;
    padding: 9px;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.18s;
    font-family: 'DM Sans', sans-serif;
  }
  .toggle-btn.active {
    background: #5b21b6;
    color: #ede9fe;
  }
  .toggle-btn.inactive {
    background: none;
    color: #5c5278;
  }
  .toggle-btn.inactive:hover { color: #a89cf0; }
`;

export default function ModeToggle({ mode, setMode }) {
  return (
    <>
      {/* to choose between artist based or song based analysis  */}
      <style>{STYLES}</style>
      <div className="toggle-wrap">
        <button className={`toggle-btn ${mode === "artists" ? "active" : "inactive"}`} onClick={() => setMode("artists")}>Artists</button>
        <button className={`toggle-btn ${mode === "songs" ? "active" : "inactive"}`} onClick={() => setMode("songs")}>Songs</button>
      </div>
    </>
  );
}