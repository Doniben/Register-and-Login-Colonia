const notesCtrl = {};

// Models
const Note = require("../models/Note");

notesCtrl.renderNoteForm = (req, res) => {
  res.render("360/new-note");
};

notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please Write a Title." });
  }
  if (!description) {
    errors.push({ text: "Please Write a Description" });
  }
  if (errors.length > 0) {
    res.render("360/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("success_msg", "Note Added Successfully");
    res.redirect("/360");
  }
};

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id })
  const email = req.user.email;
  const name = req.user.name;
  res.render("360/all-notes", { notes,  email, name});
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash("error_msg", "No Autorizado");
    return res.redirect("/360");
  }
  res.render("360/edit-note", { note });
};

notesCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Note Updated Successfully");
  res.redirect("/360");
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Note Deleted Successfully");
  res.redirect("/360");
};

module.exports = notesCtrl;
