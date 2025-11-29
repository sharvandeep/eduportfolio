import React, { useState } from "react";
import { useParams } from "react-router-dom";

const FacultyFeedback = () => {
  const { id } = useParams();
  const [projectTitle, setProjectTitle] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      studentId: id,
      projectTitle,
      teacherName,
      message,
      date: new Date().toLocaleString(),
    };

    const oldFeedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    localStorage.setItem("feedbacks", JSON.stringify([...oldFeedbacks, newFeedback]));

    setSubmitted(true);
    setMessage("");
    setProjectTitle("");
    setTeacherName("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🧑‍🏫 Feedback for Student {id}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Project Title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Your Name"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            style={styles.input}
            required
          />
          <textarea
            placeholder="Write your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            style={styles.textarea}
            required
          ></textarea>
          <button type="submit" style={styles.button}>Submit Feedback</button>
        </form>

        {submitted && <p style={styles.success}>✅ Feedback submitted successfully!</p>}
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: "#f7faff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "white",
    padding: "2.5rem",
    borderRadius: "1.2rem",
    boxShadow: "0 5px 25px rgba(0,0,0,0.05)",
    width: "90%",
    maxWidth: 600,
  },
  heading: {
    textAlign: "center",
    color: "#0d47a1",
    marginBottom: "1.5rem",
  },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  input: {
    padding: "0.9rem",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  textarea: {
    padding: "1rem",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.9rem",
    background: "#19b94b",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
  success: {
    marginTop: "1rem",
    color: "#2e7d32",
    textAlign: "center",
    background: "#e8f5e9",
    padding: "0.6rem",
    borderRadius: "8px",
  },
};

export default FacultyFeedback;
