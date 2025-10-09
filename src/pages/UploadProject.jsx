import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadProject({ projects, setProjects }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const studentId = localStorage.getItem("currentStudentId");

  function handleSubmit(e) {
    e.preventDefault();
    let fileArr = Array.from(files || []).map(f =>
      f.name ? f.name : f
    );
    const newProject = {
      id: Date.now(),
      title,
      description: desc,
      files: fileArr,
      date: new Date().toISOString()
    };

    // Read existing from localStorage (for robustness)
    const stored =
      JSON.parse(localStorage.getItem(`projects:${studentId}`)) || [];
    const updated = [...stored, newProject];

    // Set state and persist to localStorage
    setProjects(updated);
    localStorage.setItem(`projects:${studentId}`, JSON.stringify(updated));

    navigate("/student");
  }

  return (
    <form
      style={{
        maxWidth: 900,
        margin: "3rem auto",
        background: "#f0f6ff",
        borderRadius: "1.5rem",
        padding: "3rem 3.8rem",
        boxShadow: "0 12px 24px #3777fe33"
      }}
      onSubmit={handleSubmit}
    >
      <h1 style={{
        fontWeight: 900,
        fontSize: "2.6rem",
        color: "#2548a2",
        marginBottom: "1.6rem"
      }}>
        Upload New Project
      </h1>
      <label style={{
        fontWeight: 700,
        fontSize: "1.22rem",
        color: "#4763b3",
        marginBottom: "0.5rem",
        display: "block"
      }}>Project Title</label>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        placeholder="Enter project title"
        style={{
          width: "100%",
          padding: "0.6rem 1rem",
          fontSize: "1.1rem",
          borderRadius: "0.9rem",
          border: "2px solid #bdd4ff",
          boxShadow: "0 3px 11px #d6e1ff",
          marginBottom: "2.2rem",
          outlineColor: "#3777fe"
        }}
      />
      <label style={{
        fontWeight: 700,
        fontSize: "1.22rem",
        color: "#4763b3",
        marginBottom: "0.5rem",
        display: "block"
      }}>Project Description</label>
      <textarea
        value={desc}
        onChange={e => setDesc(e.target.value)}
        required
        placeholder="Briefly describe your project"
        style={{
          width: "100%",
          padding: "1.2rem 1.3rem",
          fontSize: "1.1rem",
          borderRadius: "1rem",
          border: "2px solid #bdd4ff",
          boxShadow: "0 3px 11px #d6e1ff",
          minHeight: "110px",
          resize: "vertical",
          marginBottom: "2.6rem",
          outlineColor: "#3777fe"
        }}
      />
      <label style={{
        fontWeight: 700,
        fontSize: "1.22rem",
        color: "#4763b3",
        marginBottom: "0.6rem",
        display: "block"
      }}>Attach Files</label>
      <input
        type="file"
        multiple
        onChange={e => setFiles(e.target.files)}
        style={{
          width: "100%",
          padding: "0.6rem 1rem",
          fontSize: "1.05rem",
          borderRadius: "0.9rem",
          border: "2px solid #bdd4ff",
          cursor: "pointer",
          marginBottom: "2.2rem",
          boxShadow: "0 3px 11px #d6e1ff"
        }}
      />
      <small style={{ color: "#7f8ba5", marginBottom: "2rem", display: "block" }}>
        Files are uploaded to the server so faculty can open them.
      </small>
      <div>
        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg, #3777fe 0%, #64adea 100%)",
            color: "#fff",
            fontWeight: 800,
            fontSize: "1.14rem",
            padding: "0.98rem 2.8rem",
            border: "none",
            borderRadius: "1.1rem",
            cursor: "pointer",
            boxShadow: "0 8px 34px #3777fe7e"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, #64adea 0%, #3777fe 100%)"}
          onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(90deg, #3777fe 0%, #64adea 100%)"}
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => navigate("/student")}
          style={{
            background: "#fff",
            color: "#3777fe",
            fontWeight: 700,
            fontSize: "1.14rem",
            padding: "0.98rem 2.8rem",
            border: "2px solid #3777fe",
            borderRadius: "1.1rem",
            marginLeft: "1.5rem",
            cursor: "pointer",
            boxShadow: "0 7px 20px #adedff6e"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#3777fe";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#3777fe";
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
