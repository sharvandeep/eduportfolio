// src/pages/FacultyEvaluate.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FacultyEvaluate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState(() => localStorage.getItem(`feedback:${id}`) || "");

  const save = () => {
    localStorage.setItem(`feedback:${id}`, text);
    navigate(-1);
  };

  return (
    <div style={{ maxWidth: 900, margin: "32px auto", padding: "0 20px" }}>
      <h2>Evaluate • {id}</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => navigate(-1)} style={{ border: "1px solid #cbd5e1", padding: "8px 14px", borderRadius: 8, background: "#fff" }}>Cancel</button>
        <button onClick={save} style={{ background: "#16a34a", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8 }}>Save Feedback</button>
      </div>
    </div>
  );
}
