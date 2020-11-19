const express = require("express");
const router = express.Router();

// Controller
const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote
} = require("../controllers/360.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Note
router.get("/360/add", isAuthenticated, renderNoteForm);

router.post("/360/new-note", isAuthenticated, createNewNote);

// Get All Notes
router.get("/360", isAuthenticated, renderNotes);

// Edit Notes
router.get("/360/edit/:id", isAuthenticated, renderEditForm);

router.put("/360/edit-note/:id", isAuthenticated, updateNote);

// Delete Notes
router.delete("/360/delete/:id", isAuthenticated, deleteNote);

module.exports = router;
