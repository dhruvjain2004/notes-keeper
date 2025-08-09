import React, { useEffect, useState } from "react";
import api from "../api";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.getNotes();
      setNotes(res.data);
    } catch (err) {
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (data) => {
    try {
      const res = await api.createNote(data);
      setNotes(prev => [res.data, ...prev]);
    } catch (err) {
      alert("Failed to create note");
    }
  };

  const updateNote = async (id, data) => {
    try {
      const res = await api.updateNote(id, data);
      setNotes(prev => prev.map(n => (n._id === id ? res.data : n)));
      setEditing(null);
    } catch (err) {
      alert("Failed to update note");
    }
  };

  const deleteNote = async (id) => {
    if (!confirm("Delete this note?")) return;
    try {
      await api.deleteNote(id);
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  if (loading) return <div className="card">Loading...</div>;
  return (
    <div>
      <div className="row">
        <div className="col">
          <NoteForm onCreate={addNote} onUpdate={updateNote} editing={editing} />
        </div>
        <div className="col">
          <h3>Your Notes</h3>
          {error && <div className="error">{error}</div>}
          {notes.length === 0 ? <p>No notes yet.</p> : (
            <div className="notes-grid">
              {notes.map(note => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={() => setEditing(note)}
                  onDelete={() => deleteNote(note._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
