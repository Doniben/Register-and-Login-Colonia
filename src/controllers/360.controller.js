const notesCtrl = {};

// Models
const User = require("../models/User");


notesCtrl.renderNotes = async (req, res) => {
  res.render("360/all-notes");
};

module.exports = notesCtrl;
