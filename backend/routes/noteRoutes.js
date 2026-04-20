const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// GET: fetch all notes (newest first)
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error while reading notes" });
  }
});

// POST: create a new note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const created = await Note.create({ title, content });
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating note" });
  }
});

// PUT: update a note by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const updated = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // return updated note
    );

    if (!updated) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error while updating note" });
  }
});

// DELETE: delete a note by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Note.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting note" });
  }
});

module.exports = router;

