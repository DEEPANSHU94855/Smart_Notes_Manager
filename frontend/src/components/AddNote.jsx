import React, { useState } from "react";

export default function AddNote({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); // stop page refresh
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Please enter both title and content.");
      return;
    }

    try {
      setSaving(true);
      await onAdd({ title: title.trim(), content: content.trim() });
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card">
      <h2 className="cardTitle">Add a Note</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          maxLength={60}
        />

        <textarea
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          rows={4}
          maxLength={500}
        />

        {error ? <div className="error">{error}</div> : null}

        <button className="btn" disabled={saving}>
          {saving ? "Saving..." : "Add Note"}
        </button>
      </form>
    </div>
  );
}

