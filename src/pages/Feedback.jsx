import React, { useState } from "react";

const Feedback = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback sent: " + message);
    setMessage("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Your feedback"
          rows={5}
          style={{ width: "100%", marginBottom: "1rem" }}
          required
        />
        <br />
        <button type="submit">Send Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
