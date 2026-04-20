const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Small helper to keep API calls simple and reusable
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  // If backend sends an error, show its message
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Request failed");
  }

  // Some endpoints may return empty body; handle safely
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export function getNotes() {
  return request("/api/notes");
}

export function createNote(note) {
  return request("/api/notes", {
    method: "POST",
    body: JSON.stringify(note)
  });
}

export function updateNote(id, note) {
  return request(`/api/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(note)
  });
}

export function deleteNote(id) {
  return request(`/api/notes/${id}`, { method: "DELETE" });
}

