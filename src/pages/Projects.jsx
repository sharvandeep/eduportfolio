import React from "react";
import { useNavigate } from "react-router-dom";
import './Projects.css';

export default function Projects({ projects }) {
  const navigate = useNavigate();

  return (
    <div className="project-container">
      <div className="project-title">
        Projects
        <button
          className="new-project-btn"
          onClick={() => navigate("/upload")}
        >
          + New Project
        </button>
      </div>
      {projects.length === 0 ? (
        <p className="project-none">No projects added yet</p>
      ) : (
        projects.map((proj, idx) => (
          <div className="project-card" key={idx}>
            <h2 className="project-card-title">{proj.title}</h2>
            <p className="project-card-desc">{proj.desc}</p>
            <ul className="project-card-files">
              {proj.files.map((f, idxf) => (
                <li key={idxf}>
                  <a href="#" target="_blank" rel="noopener noreferrer">{f}</a>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
