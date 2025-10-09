import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FacultyStudentPortfolio() {
  const { id } = useParams();
  const navigate = useNavigate();

  let data = null;
  try {
    data = JSON.parse(localStorage.getItem(`portfolio:${id}`));
  } catch {
    data = null;
  }

  return (
    <div style={{ maxWidth: 1100, margin: "32px auto", padding: "0 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Portfolio • {id}</h2>
        <button onClick={() => navigate(-1)} style={{ border: "1px solid #cbd5e1", padding: "8px 14px", borderRadius: 8, background: "#fff" }}>Back</button>
      </div>
      {!data && <div style={{ color: "#475569" }}>No portfolio saved for this student.</div>}
      {data && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>{data.name || "Unnamed"}</h3>
          <div style={{ color: "#475569", marginBottom: 8 }}>{data.headline || "—"}</div>
          <p>{data.summary || "—"}</p>
          <div style={{ marginTop: 12 }}>
            <strong>Skills:</strong> {Array.isArray(data.skills) && data.skills.length ? data.skills.join(", ") : "—"}
          </div>
          <div style={{ marginTop: 12 }}>
            <strong>Resume:</strong> {data.resume || "—"}
          </div>
          <div style={{ marginTop: 12 }}>
            <strong>Links:</strong>
            <ul>
              {data.links?.github && <li>GitHub: <a href={data.links.github} target="_blank" rel="noreferrer">{data.links.github}</a></li>}
              {data.links?.linkedin && <li>LinkedIn: <a href={data.links.linkedin} target="_blank" rel="noreferrer">{data.links.linkedin}</a></li>}
              {data.links?.website && <li>Website: <a href={data.links.website} target="_blank" rel="noreferrer">{data.links.website}</a></li>}
              {!data.links?.github && !data.links?.linkedin && !data.links?.website && <li>—</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
