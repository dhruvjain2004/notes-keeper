import React from "react";

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">
      <div className="note-head">
        <h4>{note.title || "Untitled"}</h4>
        <div className="note-actions">
          <button className="btn-small" onClick={onEdit}>Edit</button>
          <button className="btn-danger" onClick={onDelete}>Delete</button>
        </div>
      </div>
      <p className="note-content">{note.content}</p>
      {note.tags && note.tags.length > 0 && (
        <div className="tags">
          {note.tags.map((t, i) => <span key={i} className="tag">{t}</span>)}
        </div>
      )}
      <div className="meta">Created: {new Date(note.createdAt).toLocaleString()}</div>
    </div>
  );
}
