const express = require("express");
const router = express.Router();
const log = require("./log");

router.use("/log", log);

module.exports = router;
