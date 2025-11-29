import React, { useEffect, useState } from "react";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const studentId = localStorage.getItem("currentStudentId") || ""; // Logged-in student

  useEffect(() => {
    const allFeedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    const myFeedbacks = allFeedbacks.filter(f => f.studentId === studentId);
    setFeedbacks(myFeedbacks);
  }, [studentId]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>📋 Teacher Feedback</h2>
        {feedbacks.length === 0 ? (
          <p style={styles.text}>No feedback yet. Your teacher hasn’t reviewed your project.</p>
        ) : (
          feedbacks.map((fb, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.title}>{fb.projectTitle}</h3>
              <p style={styles.message}>{fb.message}</p>
              <p style={styles.meta}>
                — <b>{fb.teacherName}</b> on {fb.date}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f7faff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  container: {
    background: "white",
    borderRadius: "20px",
    padding: "2.5rem",
    maxWidth: "700px",
    width: "100%",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
  },
  heading: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#0d47a1",
    textAlign: "center",
    marginBottom: "2rem",
  },
  text: {
    textAlign: "center",
    color: "#5f6368",
  },
  card: {
    backgroundColor: "#f9fbff",
    padding: "1.5rem",
    borderRadius: "12px",
    marginBottom: "1rem",
    border: "1px solid #e0e0e0",
  },
  title: {
    fontSize: "1.2rem",
    color: "#0d47a1",
    fontWeight: "600",
  },
  message: {
    color: "#333",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  meta: {
    fontSize: "0.85rem",
    color: "#777",
  },
};

export default Feedback;
