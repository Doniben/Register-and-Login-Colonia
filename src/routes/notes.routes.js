const express = require("express");
const router = express.Router();

// Controller
const {
  renderNotes,
} = require("../controllers/360.controller");

// Helpers

// Get All Notes
router.get("/360", renderNotes);


module.exports = router;
