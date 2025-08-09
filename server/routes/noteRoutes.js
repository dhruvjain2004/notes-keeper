import express from "express";
import Note from "../models/Note.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create Note
router.post("/", auth, async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const note = await Note.create({ title, content, tags, userId: req.user });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Notes
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Note
router.put("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate({ _id: req.params.id, userId: req.user }, req.body, { new: true });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Note
router.delete("/:id", auth, async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, userId: req.user });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
