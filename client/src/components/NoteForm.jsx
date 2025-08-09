import React, { useEffect, useState } from "react";

export default function NoteForm({ onCreate, editing, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || "");
      setContent(editing.content || "");
      setTags((editing.tags || []).join(", "));
    } else {
      setTitle("");
      setContent("");
      setTags("");
    }
  }, [editing]);

  const submit = (e) => {
    e.preventDefault();
    const data = { title, content, tags: tags.split(",").map(t => t.trim()).filter(Boolean) };
    if (editing) onUpdate(editing._id, data);
    else onCreate(data);
    setTitle(""); setContent(""); setTags("");
  };

  return (
    <div className="card">
      <h3>{editing ? "Edit Note" : "Create Note"}</h3>
      <form onSubmit={submit}>
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
        <label>Content</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} rows="6" />
        <label>Tags (comma separated)</label>
        <input value={tags} onChange={e => setTags(e.target.value)} />
        <button className="btn" type="submit">{editing ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
