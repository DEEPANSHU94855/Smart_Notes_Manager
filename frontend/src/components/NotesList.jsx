import React, { memo, useMemo, useState } from "react";

function NoteItem({ note, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty.");
      return;
    }

    try {
      setSaving(true);
      await onUpdate(note._id, { title: title.trim(), content: content.trim() });
      setEditing(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setEditing(false);
    setTitle(note.title);
    setContent(note.content);
    setError("");
  }

  return (
    <div className="note">
      <div className="noteTop">
        {editing ? (
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={60}
          />
        ) : (
          <h3 className="noteTitle">{note.title}</h3>
        )}

        <div className="noteActions">
          {editing ? (
            <>
              <button className="btnSmall" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button className="btnSmall ghost" onClick={handleCancel} disabled={saving}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="btnSmall ghost" onClick={() => setEditing(true)}>
                Edit
              </button>
              <button className="btnSmall danger" onClick={() => onDelete(note._id)}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {editing ? (
        <textarea
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          maxLength={500}
        />
      ) : (
        <p className="noteContent">{note.content}</p>
      )}

      {error ? <div className="error">{error}</div> : null}

      <div className="noteMeta">
        <span className="muted">
          Created: {new Date(note.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

const MemoNoteItem = memo(NoteItem);

export default function NotesList({ notes, onDelete, onUpdate }) {
  const empty = useMemo(() => notes.length === 0, [notes.length]);

  return (
    <div className="card">
      <h2 className="cardTitle">All Notes</h2>

      {empty ? (
        <div className="muted">No notes yet. Add your first note above.</div>
      ) : (
        <div className="notesGrid">
          {notes.map((note) => (
            <MemoNoteItem
              key={note._id}
              note={note}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

