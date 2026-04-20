import React, { useCallback, useEffect, useMemo, useState } from "react";
import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList";
import { createNote, deleteNote, getNotes, updateNote } from "./api";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load notes once when the app starts
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await getNotes();
        if (!ignore) setNotes(data);
      } catch (e) {
        if (!ignore) setError(e.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Add note (instant UI update after response)
  const handleAdd = useCallback(async ({ title, content }) => {
    setError("");
    const created = await createNote({ title, content });
    setNotes((prev) => [created, ...prev]); // fast state update
  }, []);

  // Delete note (optimistic: remove immediately for smooth UI)
  const handleDelete = useCallback(async (id) => {
    setError("");
    setNotes((prev) => prev.filter((n) => n._id !== id));
    try {
      await deleteNote(id);
    } catch (e) {
      // If delete failed, reload notes to keep UI correct (still simple)
      setError(e.message);
      const data = await getNotes();
      setNotes(data);
    }
  }, []);

  // Update note (replace just 1 note in state)
  const handleUpdate = useCallback(async (id, { title, content }) => {
    setError("");
    const updated = await updateNote(id, { title, content });
    setNotes((prev) => prev.map((n) => (n._id === id ? updated : n)));
  }, []);

  const totalNotes = useMemo(() => notes.length, [notes.length]);

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div>
            <h1 className="title">Smart Notes Manager</h1>
            <p className="subtitle">
              Simple MERN notes app (Add / Edit / Delete)
            </p>
          </div>
          <div className="badge">{totalNotes} Notes</div>
        </header>

        <AddNote onAdd={handleAdd} />

        {error ? <div className="error">{error}</div> : null}

        {loading ? (
          <div className="muted">Loading notes...</div>
        ) : (
          <NotesList notes={notes} onDelete={handleDelete} onUpdate={handleUpdate} />
        )}
      </div>
    </div>
  );
}

