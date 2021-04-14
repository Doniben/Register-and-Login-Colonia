const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex, renderAbout, renderPoliticas, renderTerminos } = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/politicas", renderPoliticas);
router.get("/terminos", renderTerminos);

module.exports = router;
