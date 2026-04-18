"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import TasteProfile from "@/components/TasteProfile";

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("soundself_result");
    if (!stored) { router.push("/"); return; }
    setData(JSON.parse(stored));
  }, [router]);

  if (!data) {
    return (
      <main style={{ minHeight: "100vh", background: "#05030f", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            border: "2px solid #7c3aed", borderTopColor: "transparent",
            animation: "spin 0.8s linear infinite", margin: "0 auto 16px"
          }} />
          <p style={{ color: "#6b7280", fontSize: 14, fontFamily: "monospace", letterSpacing: 2 }}>ANALYZING...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    );
  }

  return <TasteProfile data={data} />;
}