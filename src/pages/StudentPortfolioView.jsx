// StudentPortfolioView.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getPortfolio } from "./storage";
import "./portfolio.css";

export default function StudentPortfolioView() {
  const studentId = useMemo(
    () => localStorage.getItem("currentStudentId") || "2400032310",
    []
  );
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(getPortfolio(studentId));
  }, [studentId]);

  return (
    <div className="wrap">
      <header className="header">
        <div className="brand">EduPortpolia</div>
        <div className="student">Student: {studentId}</div>
      </header>

      <main className="card">
        <h2 className="title">My Portfolio</h2>
        {!data && <div className="muted">No portfolio saved yet.</div>}
        {data && (
          <>
            <h3 className="subtitle">{data.name || "Unnamed"}</h3>
            <p className="body">{data.about || "—"}</p>
            <p className="body">
              <strong>Skills:</strong> {data.skills || "—"}
            </p>

            <h3 className="subtitle mtop">Projects</h3>
            {data.projects.length === 0 && (
              <div className="muted">No projects listed.</div>
            )}
            {data.projects.map((p) => (
              <div key={p.id} className="project-view">
                <div className="row space-between">
                  <h4 className="project-title">{p.title || "Untitled"}</h4>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="link">
                      Visit
                    </a>
                  )}
                </div>
                <p className="body">{p.description || "—"}</p>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}
